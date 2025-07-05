import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { Video, VideoOff, Users, Globe, Mic } from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "sonner";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBuGst1zXD6oTOw7LGl3SgkOMD83XTT0Tw",
  authDomain: "webrtc-41000.firebaseapp.com",
  projectId: "webrtc-41000",
  storageBucket: "webrtc-41000.firebasestorage.app",
  messagingSenderId: "60152389529",
  appId: "1:60152389529:web:d31598f727bd8ba480fd08",
  measurementId: "G-DQ0L1BPS6F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// STUN servers
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const RandomChat = () => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [chatType, setChatType] = useState("video");
  const [connectionType, setConnectionType] = useState("global");
  const [callId, setCallId] = useState("");

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callInputRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const remoteStreamRef = useRef(new MediaStream());

  const [currentUser] = useState({
    name: "Sarah Kim",
    location: "San Francisco, CA",
    interests: ["Texnologiya", "Dizayn", "Startaplar"],
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
  });

  const startWebcam = async () => {
    setIsSearching(true);
    try {
      console.log("Requesting media stream with chatType:", chatType);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: chatType === "video",
        audio: true,
      });
      console.log("Media stream obtained:", stream);
      localStreamRef.current = stream;

      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        await webcamVideoRef.current.play();
        console.log("Local stream set to webcamVideoRef and played");
      } else {
        console.error("webcamVideoRef.current is null");
        toast.warning("Veb-kamera elementi topilmadi. Sahifani yangilang.");
      }

      setIsWebcamOn(true);
      setIsSearching(false);
    } catch (err) {
      console.error("Webcam error:", err);
      let errorMessage = "Veb-kamerani yoqishda xato yuz berdi.";
      if (err.name === "NotAllowedError") {
        errorMessage =
          "Veb-kamera ruxsati rad etildi. Iltimos, brauzer sozlamalarida kameraga ruxsat bering.";
      } else if (err.name === "NotFoundError") {
        errorMessage =
          "Veb-kamera topilmadi. Iltimos, kamera ulanganligini tekshiring.";
      }
      toast.error(errorMessage);
      setIsSearching(false);
    }
  };

  const startVideoChat = async () => {
    setIsSearching(true);
    try {
      // Initialize peer connection if not already done or closed
      if (
        !peerConnectionRef.current ||
        peerConnectionRef.current.signalingState === "closed"
      ) {
        peerConnectionRef.current = new RTCPeerConnection(servers);
        console.log("New peer connection created");
      }

      // Add tracks only if not already added
      const senders = peerConnectionRef.current.getSenders();
      localStreamRef.current.getTracks().forEach((track) => {
        const alreadyAdded = senders.some((sender) => sender.track === track);
        if (!alreadyAdded) {
          peerConnectionRef.current.addTrack(track, localStreamRef.current);
          console.log("Track added to peer connection:", track);
        } else {
          console.log("Track already added, skipping:", track);
        }
      });

      // Set up ontrack event
      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStreamRef.current.addTrack(track);
          console.log("Remote track added:", track);
        });
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStreamRef.current;
          remoteVideoRef.current.play().catch((err) => {
            console.error("Error playing remote video:", err);
          });
          console.log("Remote stream set to remoteVideoRef");
        }
      };

      const callsCollection = collection(firestore, "calls");
      const callDocRef = doc(callsCollection);
      await setDoc(callDocRef, {});

      const offerCandidates = collection(callDocRef, "offerCandidates");
      const answerCandidates = collection(callDocRef, "answerCandidates");

      setCallId(callDocRef.id);

      peerConnectionRef.current.onicecandidate = async (event) => {
        if (event.candidate) {
          await addDoc(offerCandidates, event.candidate.toJSON());
          console.log("ICE candidate added to offerCandidates");
        }
      };

      const offerDescription = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offerDescription);
      console.log("Offer created and set:", offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDocRef, { offer });

      onSnapshot(callDocRef, (snapshot) => {
        const data = snapshot.data();
        if (
          !peerConnectionRef.current.currentRemoteDescription &&
          data?.answer
        ) {
          const answerDescription = new RTCSessionDescription(data.answer);
          peerConnectionRef.current.setRemoteDescription(answerDescription);
          setIsChatStarted(true);
          setIsSearching(false);
          console.log("Answer received and set");
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnectionRef.current.addIceCandidate(candidate);
            console.log("Answer ICE candidate added");
          }
        });
      });
    } catch (err) {
      console.error("Error creating call:", err);
      toast.error("Qo‘ng‘iroqni boshlashda xato yuz berdi.");
      setIsSearching(false);
    }
  };

  const answerCall = async () => {
    const callId = callInputRef.current.value;
    if (!callId) {
      toast.warning("Iltimos, qo‘ng‘iroq ID sini kiriting");
      return;
    }
    setIsSearching(true);
    try {
      // Initialize peer connection if not already done or closed
      if (
        !peerConnectionRef.current ||
        peerConnectionRef.current.signalingState === "closed"
      ) {
        peerConnectionRef.current = new RTCPeerConnection(servers);
        console.log("New peer connection created for answer");
      }

      // Add tracks only if not already added
      const senders = peerConnectionRef.current.getSenders();
      localStreamRef.current.getTracks().forEach((track) => {
        const alreadyAdded = senders.some((sender) => sender.track === track);
        if (!alreadyAdded) {
          peerConnectionRef.current.addTrack(track, localStreamRef.current);
          console.log("Track added to peer connection:", track);
        } else {
          console.log("Track already added, skipping:", track);
        }
      });

      // Set up ontrack event
      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStreamRef.current.addTrack(track);
          console.log("Remote track added:", track);
        });
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStreamRef.current;
          remoteVideoRef.current.play().catch((err) => {
            console.error("Error playing remote video:", err);
          });
          console.log("Remote stream set to remoteVideoRef");
        }
      };

      const callDocRef = doc(firestore, "calls", callId);
      const callSnapshot = await getDoc(callDocRef);

      if (!callSnapshot.exists()) {
        toast.error("Qo‘ng‘iroq ID si topilmadi");
        setIsSearching(false);
        return;
      }

      const offerCandidates = collection(callDocRef, "offerCandidates");
      const answerCandidates = collection(callDocRef, "answerCandidates");

      peerConnectionRef.current.onicecandidate = async (event) => {
        if (event.candidate) {
          await addDoc(answerCandidates, event.candidate.toJSON());
          console.log("ICE candidate added to answerCandidates");
        }
      };

      const callData = callSnapshot.data();
      const offerDescription = callData.offer;
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );
      console.log("Offer description set");

      const answerDescription = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answerDescription);
      console.log("Answer created and set:", answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await setDoc(callDocRef, { ...callData, answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnectionRef.current.addIceCandidate(candidate);
            console.log("Offer ICE candidate added");
          }
        });
      });

      setIsChatStarted(true);
      setIsSearching(false);
    } catch (err) {
      console.error("Error answering call:", err);
      toast.error("Qo‘ng‘iroqqa javob berishda xato yuz berdi: " + err.message);
      setIsSearching(false);
    }
  };

  const turnOffCamera = () => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    if (webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    remoteStreamRef.current = new MediaStream();
    setIsWebcamOn(false);
    setIsChatStarted(false);
    setCallId("");
    console.log("Camera turned off, peer connection reset");
  };

  useEffect(() => {
    // Ensure local video plays when stream is set
    if (isWebcamOn && localStreamRef.current && webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = localStreamRef.current;
      webcamVideoRef.current.play().catch((err) => {
        console.error("Error playing local video:", err);
      });
    }
  }, [isWebcamOn]);

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      console.log("Cleanup: Streams stopped, peer connection closed");
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-8 my-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tasodifiy Aloqa
          </h1>
          <p className="text-gray-600">
            O‘z-o‘zidan suhbatlar orqali yangi odamlar bilan tanishing va
            tarmog‘ingizni kengaytiring
          </p>
        </div>

        {!isWebcamOn && !isSearching && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Aloqa Turini Tanlang
            </h2>

            <div className="grid md:grid-cols-1 gap-4 mb-6">
              <button
                onClick={() => setChatType("video")}
                className={`p-4 rounded-xl border-2 ${
                  chatType === "video"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Video className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Video Suhbat</div>
              </button>

              {/* <button
                onClick={() => setChatType("voice")}
                className={`p-4 rounded-xl border-2 ${
                  chatType === "voice"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Mic className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Ovozli Suhbat</div>
              </button> */}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setConnectionType("local")}
                className={`p-4 rounded-xl border-2 ${
                  connectionType === "local"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Mahalliy Tarmoq</div>
              </button>

              <button
                onClick={() => setConnectionType("global")}
                className={`p-4 rounded-xl border-2 ${
                  connectionType === "global"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Globe className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Global Tarmoq</div>
              </button>
            </div>

            <button
              onClick={startWebcam}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <Video className="inline w-4 h-4 mr-2" />
              Veb-kamerani Yoqish
            </button>
          </div>
        )}

        {isSearching && (
          <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Mos Keluvchini Qidirish...
            </h2>
            <p className="text-gray-600">
              Sizning qiziqishlaringizga mos keladigan odam bilan
              bog‘lanmoqdamiz
            </p>
          </div>
        )}

        {isWebcamOn && (
          <div className="space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Mahalliy Oqim
                  </h3>
                  <video
                    ref={webcamVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Masofaviy Oqim
                  </h3>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-gray-900 p-4 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    ref={callInputRef}
                    value={callId}
                    onChange={(e) => setCallId(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Qo‘ng‘iroq ID sini kiriting"
                  />
                  <button
                    onClick={answerCall}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    <Video className="inline w-4 h-4 mr-2" />
                    Javob Berish
                  </button>
                </div>
                <button
                  onClick={startVideoChat}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <Video className="inline w-4 h-4 mr-2" />
                  Video Suhbatni Boshlash
                </button>
                <button
                  onClick={turnOffCamera}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <VideoOff className="inline w-4 h-4 mr-2" />
                  Kamerani O‘chirish
                </button>
              </div>
            </div>

            {isChatStarted && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {currentUser.name}
                    </h3>
                    <p className="text-gray-600">{currentUser.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RandomChat;
