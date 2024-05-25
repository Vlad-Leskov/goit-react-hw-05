import css from "./Contact.module.css";

const Contact = ({ contact, onDelete }) => {
  const { id, name, number } = contact;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className={css.card}>
      <p>{name}</p>
      <p>{number}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Contact;
