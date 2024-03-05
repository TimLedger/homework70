import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {contactsAdd, contactsOne, contactsEdit} from "../../store/contactsThunk";
import Preloader from '../../components/Preloader/Preloader';
import { Contact } from '../../types';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contact = useAppSelector(state => state.contacts.contact);
  const loading = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<Contact>({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    if (params.id) {
      dispatch(contactsOne(params.id));
      setEditMode(true);
    } else {
      setSubmitData({
        name: "",
        phone: "",
        email: "",
        photo: "",
      });
      setEditMode(false);
    }
  }, [dispatch, params.id]);

  
    useEffect(() => {
        if (editMode && contact) {
            setSubmitData(contact);
        }
    }, [editMode, contact]);
  
  const contactChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setSubmitData(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };
  
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      await dispatch(contactsEdit({ id: params.id, data: submitData }));
    } else {
      await dispatch(contactsAdd(submitData));
    }
    navigate('/');
  };

  return (
    <div className="form-frame">
      <form onSubmit={onFormSubmit} autoComplete="off" className="form">
        <div className='form-content'>
          <div className="form-img-container">
            <img className="form-img" src={submitData.photo ? submitData.photo : 'https://www.islandgift.ru/user/standard/man.png'} alt={submitData.name}/>
          </div>
          <div className='form-inputs'>
            <input
              id="name"
              type="text"
              name="name"
              value={submitData.name}
              onChange={contactChanged}
              className="form-input"
              placeholder='Имя'
              required
            />
            <input
              id="phone"
              type="tel"
              name="phone"
              value={submitData.phone}
              onChange={contactChanged}
              className="form-input"
              placeholder='Номер телефона'
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              value={submitData.email}
              onChange={contactChanged}
              className="form-input"
              placeholder='Email'
              required
            />
            <input
              id="photo"
              type="url"
              name="photo"
              value={submitData.photo}
              onChange={contactChanged}
              className="form-input"
              placeholder='Ссылка на фото контакта'
            />
          </div>
        </div>
        { loading.postLoading || loading.editLoading ? (<Preloader />) : (
          <div className='form-btns'>
            <button type="submit" className='form-btn'>
              {params.id ? 'Сохранить' : 'Создать контакт'}
            </button>
            <NavLink className='form-btn' to="/">
              Вернуться
            </NavLink>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;