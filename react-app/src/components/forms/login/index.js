import React, { useState } from 'react'
import { Modal } from '../../context/modal';
import LoginForm from '../../auth/LoginForm';
import { Link } from 'react-router-dom';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Link
        onClick={() => setShowModal(true)}
      >
      <i className="fa-solid fa-arrow-right-to-bracket"></i>  Log In
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal