"use client"
import React from 'react'
import {CldUploadWidget} from 'next-cloudinary'
const Dashboard = () => {
  return (
    <div className='admin'> 
      <h1>Dashboard</h1>
      <CldUploadWidget uploadPreset="<Your Upload Preset>">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
    </div>
  )
}

export default Dashboard
