// export const POST = async (req) => {
//     try {
//       const formData = await req.formData();
//       const file = formData.get('file');
//       const uploadPreset = formData.get('upload_preset');
  
//       if (!file || !uploadPreset) {
//         return new Response(JSON.stringify({ error: 'Missing file or upload preset' }), { status: 400 });
//       }
  
//       const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!cloudinaryResponse.ok) {
//         const errorData = await cloudinaryResponse.text();
//         console.error('Cloudinary Error Response:', errorData);
//         return new Response(JSON.stringify({ error: 'Failed to upload image to Cloudinary', details: errorData }), { status: cloudinaryResponse.status });
//       }
  
//       const data = await cloudinaryResponse.json();
//       return new Response(JSON.stringify({ url: data.secure_url }), { status: 200 });
//     } catch (error) {
//       console.error('Server Error:', error);
//       return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
//     }
//   };
  