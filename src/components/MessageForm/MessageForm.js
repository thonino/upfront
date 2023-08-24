import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    
    const expediteur = user.data.email; // C'est juste un exemple, vous devez définir la valeur appropriée
    const destinataire = user.data.role === 'admin' ? "admin@admin" : null; // à définir selon votre logique
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            expediteur: expediteur,
            destinataire: destinataire || "admin@admin",
            texte: message,
            // Vous pouvez également ajouter le champ datetime si nécessaire
        };

        // ... (la même logique pour envoyer les données via axios)

    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="container col-6">
                <div className="align-items-center mb-2">
                    <h1 className="fw-bold text-center">
                        Contacter
                        <span className="fw-light fs-3 fst-italic text-success">
                            <br />
                            De: {expediteur ? expediteur : user.data.email}<br />
                            A: {destinataire ? destinataire : "admin@admin"}
                        </span>
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {user.data.role === 'admin' ? (
                        <>
                            <input type="hidden" value={expediteur} />
                            <input type="hidden" value={destinataire} />
                        </>
                    ) : (
                        <>
                            <input type="hidden" value={user.data.email} />
                            <input type="hidden" value="admin@admin" />
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="texte" className="fst-italic">Votre Texte</label>
                        <textarea
                            id="texte"
                            className="form-control"
                            name="texte"
                            rows="4"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary fst-italic mt-2 mx-2">Envoyer</button>
                    <a href="/messagebox/received" className="btn btn-info fw-bold mt-2">Boite de messagerie</a>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;
