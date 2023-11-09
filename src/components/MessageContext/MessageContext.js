import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../AuthContext/AuthContext.js"; 

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const { user } = useContext(AuthContext); 
  

  useEffect(() => {
    if (user) { 
      const fetchMessages = async () => {
        try {
          const response = await axios.get('https://uppercase-app-back-efd9a0ca1970.herokuapp.com/messagereceived', { withCredentials: true });
          const fetchedMessages = response.data.messages.reverse();
          setMessages(fetchedMessages);
          const unreadCount = fetchedMessages.filter(message => !message.lu).length;
          setUnreadMessagesCount(unreadCount);
        } catch (error) {
          console.error("Erreur lors de la récupération des messages:", error);
        }
      };
      fetchMessages();
    }
  }, [user]); 

  // const markMessageAsRead = async (messageId) => {
  //   try {
  //     const response = await axios.put(
  //       `https://uppercase-app-back-efd9a0ca1970.herokuapp.com/markasread/${messageId}`,
  //       { id: messageId }, 
  //       { withCredentials: true }
  //     );
  //     console.log('Réponse du serveur', response);
  //     setMessages(prevMessages =>
  //       prevMessages.map(message =>
  //         message._id === messageId ? { ...message, lu: true } : message
  //       )
  //     );
  //     setUnreadMessagesCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  //     return response; 
  //   } catch (error) {
  //     console.error("Erreur lors de la mise à jour du message comme lu:", error);
  //     throw error; 
  //   }
  // };

  const markMessageAsRead = async (messageId) => {
    try {
      const response = await axios.put(
        `https://uppercase-app-back-efd9a0ca1970.herokuapp.com/markasread/${messageId}`,
        {
          id: message._id,
          destinataire: message.destinataire,
          expediteur: message.expediteur,
          texte: message.texte,
          date: message.date,
          lu: true,
          
        },
        { withCredentials: true }
      );
      console.log('Réponse du serveur', response);
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === message._id ? { ...msg, lu: true } : msg
        )
      );
      setUnreadMessagesCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du message comme lu:", error);
      throw error;
    }
  };
  

  return (
  <MessageContext.Provider value={{
    messages,
    setMessages,
    unreadMessagesCount,
    setUnreadMessagesCount,
    markMessageAsRead
  }}>
    {children}
  </MessageContext.Provider>
  );
};