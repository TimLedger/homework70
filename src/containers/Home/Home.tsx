import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Preloader from '../../components/Preloader/Preloader';
import { contactsList, contactsDelete } from "../../store/contactsThunk";
import { Link } from 'react-router-dom';
import {Contacts} from '../../types';
import './Home.css';

const Home = () => {
    const contacts = useAppSelector(state => state.contacts.contacts);
    const loading = useAppSelector((state) => state.contacts);
    const dispatch = useAppDispatch();
    const [selectedContact, setSelectedContact] = useState<Contacts | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(contactsList());
    }, [dispatch]);

    const deleteContact = async (id: string) => {
      await dispatch(contactsDelete(id));
      await dispatch(contactsList());
      closeModal();
   };

    const openModal = (contact: Contacts) => {
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
          <div>
            {contacts.length < 1 ? (
              <h2>Контактов еще нет!</h2>
            ) : (
              <ul className="contact-list">
                {contacts.map((contact, index) => (
                  <li className='contact' key={index} onClick={() => openModal(contact)}>
                    <div className="contact-img-container">
                      <img className="contact-img" src={contact.photo ? contact.photo : 'https://www.islandgift.ru/user/standard/man.png'} alt={contact.name}/>
                    </div>
                    <h3 className='contact-name'>{contact.name}</h3>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isModalOpen && (
          <div>
            <div className="modal">
              <span className="modal-close" onClick={closeModal}></span>
              {selectedContact && (
                <div>
                  <div className='modal-content'>
                    <div className="modal-img-container">
                      <img className="modal-img" src={selectedContact.photo ? selectedContact.photo : 'https://www.islandgift.ru/user/standard/man.png'} alt={selectedContact.name}/>
                    </div>
                    <div className="modal-info">
                      <h3 className='modal-name'> {selectedContact.name}</h3>
                      <p> {selectedContact.phone}</p>
                      <p> {selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="modal-btns">
                    <button
                      className='modal-btn'
                      onClick={() => deleteContact(selectedContact.id)}
                      disabled={loading.deleteLoading} 
                    >
                      { loading.deleteLoading ? <Preloader /> : 'Удалить'}
                    </button>
                    <Link className='modal-btn' to={'/contacts/' + selectedContact.id + '/edit'}>
                      Изменить
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className='modal-backdrop' onClick={closeModal}></div>
          </div>
        )}
      </div>
    );
};

export default Home;