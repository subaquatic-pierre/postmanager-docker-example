import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import EditPost from 'pages/EditPost';
import CreatePost from 'pages/CreatePost';
import Post from 'pages/Post';

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id/edit" element={<EditPost />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/post/create" element={<CreatePost />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
