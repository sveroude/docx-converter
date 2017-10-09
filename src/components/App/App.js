import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import UploadForm from '../UploadForm/UploadForm';

const App = () => (
    <div className="content">
        <AppHeader />
        <main>
            <UploadForm />
        </main>
    </div>
);

export default App;
