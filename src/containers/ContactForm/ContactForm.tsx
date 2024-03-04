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
  const loading = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();
  const [submitData, setSubmitData] = useState<Contact>({
    name: "",
    phone: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    if (params.id) {
        dispatch(contactsOne(params.id));
    } else {
      setSubmitData({
        name: "",
        phone: "",
        email: "",
        photo: "",
    });
    }
  }, [dispatch, params.id]);
  
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

  let button = (
    <button type="submit" className="form-submit-btn">
     {params.id ? 'Сохранить' : 'Создать контакт'}
    </button>
  );

  if (loading.postLoading) {
    button = <Preloader />;
  }

  return (
    <div className="form-frame">
      <form onSubmit={onFormSubmit} autoComplete="off" className="form">
        <input
          id="name"
          type="text"
          name="name"
          value={submitData.name}
          onChange={contactChanged}
          className="form-control"
          required
        />
        <input
          id="phone"
          type="tel"
          name="phone"
          value={submitData.phone}
          onChange={contactChanged}
          className="form-control"
          required
        />
        <input
          id="email"
          type="email"
          name="email"
          value={submitData.email}
          onChange={contactChanged}
          className="form-control"
          required
        />
        <input
          id="photo"
          type="url"
          name="photo"
          value={submitData.photo}
          onChange={contactChanged}
          className="form-control"
        />
        <img src={submitData.photo} alt={submitData.name}/>
        {button}
        <NavLink to="/">Back to contacts</NavLink>
      </form>
    </div>
  );
};

export default ContactForm;