import React from 'react'

export default function ConfirmModal({ isOpen, closeModal, children }) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center'>
            <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4" onClick={e => e.stopPropagation()}>
                <button className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-semibold" onClick={closeModal}>&times;</button>
                {children}
                <button
                    type="button"
                    className="bg-[#19747E] text-white rounded hover:bg-[#316268] p-1 mx-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
            </div>
        </div>
    )
}