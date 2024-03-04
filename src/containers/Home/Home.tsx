import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Preloader from '../../components/Preloader/Preloader';
import { contactsList } from "../../store/contactsThunk";
import {Contact} from '../../types';
import './Home.css';

const Home = () => {
    const contacts = useAppSelector(state => state.contacts.contacts);
    const loading = useAppSelector((state) => state.contacts);
    const dispatch = useAppDispatch();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(contactsList());
    }, [dispatch]);

    const openModal = (contact: Contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedContact(null);
        setIsModalOpen(false);
    };

    return (
      <div>
        {loading.getLoading ? (
          <Preloader />
        ) : (
          <div className="contact-list">
            {contacts.length < 1 ? (
              <h2>Контактов еще нет!</h2>
            ) : (
              <ul className="contact-list-content">
                {contacts.map((contact, index) => (
                  <li className='contact' key={index} onClick={() => openModal(contact)}>
                    <div className="contact-img">
                      <img src={contact.photo} alt={contact.name}/>
                    </div>
                    <h3>{contact.name}</h3>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isModalOpen && (
          <div>
            <div className="modal">
              <div className="modal-content">
                <span className="modal-close" onClick={closeModal}>&times;</span>
                {selectedContact && (
                  <div className='modal-info'>
                    <div className="modal-img">
                      <img src={selectedContact.photo} alt={selectedContact.name}/>
                    </div>
                    <h3> {selectedContact.name}</h3>
                    <p> {selectedContact.phone}</p>
                    <p> {selectedContact.email}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='modal-backdrop' onClick={closeModal}></div>
          </div>
        )}
      </div>
    );
};

export default Home;
