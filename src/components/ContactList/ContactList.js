import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';

import { deleteContact, fetchContacts } from 'Redux/operation';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'Redux/selectors';
import { Audio } from 'react-loader-spinner';
import { useEffect } from 'react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const error = useSelector(selectError);
  const isloading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts);
  }, [dispatch]);

  return (
    <ul>
      {isloading && <Audio />}
      {contacts.map(({ id, phone, name }) => {
        return (
          <li key={id}>
            <div className={css.contact_card}>
              <div className={css.contact_details}>
                <p className={css.contact_name}>{name}</p>
                <p className={css.contact_phone}>☎️ {phone}</p>
              </div>
              <button
                className={css.contact_button}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                🚮 Delete
              </button>
            </div>
          </li>
        );
      })}

      {error && <h2 className={css.error}>{error}</h2>}
    </ul>
  );
};
