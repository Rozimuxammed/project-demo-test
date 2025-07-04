import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  SkipForward,
  Users,
  Globe,
} from "lucide-react";

const RandomChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatType, setChatType] = useState("video");
  const [connectionType, setConnectionType] = useState("global");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null); // Future: peer connection
  const localStreamRef = useRef(null);

  const [currentUser] = useState({
    name: "Sarah Kim",
    location: "San Francisco, CA",
    interests: ["Tech", "Design", "Startups"],
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
  });

  const handleStartChat = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setIsConnected(true);
    }, 3000);
  };

  const handleEndChat = () => {
    setIsConnected(false);
    setIsMuted(false);
    setIsVideoOff(false);
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const handleSkipUser = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  useEffect(() => {
    if (isConnected) {
      navigator.mediaDevices
        .getUserMedia({ video: chatType === "video", audio: true })
        .then((stream) => {
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Media error:", err));
    }
  }, [isConnected, chatType]);

  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current
        .getAudioTracks()
        .forEach((t) => (t.enabled = !isMuted));
    }
  }, [isMuted]);

  useEffect(() => {
    if (chatType === "video" && localStreamRef.current) {
      localStreamRef.current
        .getVideoTracks()
        .forEach((t) => (t.enabled = !isVideoOff));
    }
  }, [isVideoOff, chatType]);

  return (
    <Layout>
      <div className="space-y-8 my-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Random Connect
          </h1>
          <p className="text-gray-600">
            Meet new people and expand your network through spontaneous
            conversations
          </p>
        </div>

        {!isConnected && !isSearching && (
          <>
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Choose Your Connection Type
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setChatType("video")}
                  className={`p-4 rounded-xl border-2 ${
                    chatType === "video"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Video className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Video Chat</div>
                </button>

                <button
                  onClick={() => setChatType("voice")}
                  className={`p-4 rounded-xl border-2 ${
                    chatType === "voice"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Mic className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Voice Chat</div>
                </button>
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
                  <div className="font-medium">Local Network</div>
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
                  <div className="font-medium">Global Network</div>
                </button>
              </div>

              <button
                onClick={handleStartChat}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700"
              >
                Start {chatType === "video" ? "Video" : "Voice"} Chat
              </button>
            </div>
          </>
        )}

        {isSearching && (
          <div className="bg-white rounded-2xl p-12 shadow-sm max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Finding Your Match...
            </h2>
            <p className="text-gray-600">
              We're connecting you with someone who shares your interests
            </p>
          </div>
        )}

        {isConnected && (
          <div className="space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-video relative">
                {chatType === "video" ? (
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative bg-gray-800">
                      <img
                        src={currentUser.avatar}
                        alt="Remote user"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentUser.name}
                      </div>
                    </div>
                    <div className="relative bg-gray-700">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      {isVideoOff && (
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                          <VideoOff className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Mic className="w-12 h-12" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Voice Chat Active
                      </h3>
                      <p className="text-purple-100">
                        Connected with {currentUser.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-900 p-4">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isMuted ? "bg-red-500" : "bg-gray-700"
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="text-white" />
                    ) : (
                      <Mic className="text-white" />
                    )}
                  </button>

                  {chatType === "video" && (
                    <button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isVideoOff ? "bg-red-500" : "bg-gray-700"
                      }`}
                    >
                      {isVideoOff ? (
                        <VideoOff className="text-white" />
                      ) : (
                        <Video className="text-white" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleSkipUser}
                    className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <SkipForward className="text-white" />
                  </button>

                  <button
                    onClick={handleEndChat}
                    className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <Phone className="text-white transform rotate-135" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RandomChat;
