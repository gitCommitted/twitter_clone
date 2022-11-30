import React, { useState } from 'react'
import { Modal } from '../../context/modal';
import SignUpForm from '../../auth/SignUpForm';
import { Link } from 'react-router-dom';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Link
        onClick={() => setShowModal(true)}
      >
      <i className="fa-solid fa-user-plus"></i>  Sign Up
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal