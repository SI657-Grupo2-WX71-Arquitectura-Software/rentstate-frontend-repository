import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const useMessageService = (userName, receiver) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userName || !receiver) {
      setLoading(false);
      return;
    }

    const fetchInitialMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://34.171.129.103:8095/api/v1/message/conversation/${userName}/${receiver.username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMessages();

    const socket = new SockJS("http://34.171.129.103:8095/ws/messages");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/messages/${userName}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      setStompClient(client);
    }, (error) => {
      console.error('WebSocket connection error: ', error);
    });

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [userName, receiver]);

  const sendMessage = (messageContent) => {
    if (!messageContent.trim() || !stompClient) return;

    const newMessage = {
      sender: userName,
      receiver: receiver,
      content: messageContent,
      timestamp: Date.now(),
    };

    stompClient.send("/app/sendMessage", {}, JSON.stringify(newMessage));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};

export default useMessageService;
