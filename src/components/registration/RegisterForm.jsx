// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { PATIENT_API_URL } from '../constants/constantApi';

// const RegisterForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       nom: '',
//       prenom: '',
//       email: '',
//       password: '',
//       adresse: '',
//       telephone: '',
//       date_naissance: '',
//       sexe: '',
//       numero_cnss: '',
//     },
//     validationSchema: Yup.object({
//       nom: Yup.string().required('Le nom est requis'),
//       prenom: Yup.string().required('Le prénom est requis'),
//       email: Yup.string().email('Adresse email invalide').required('L\'email est requis'),
//       password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
//       adresse: Yup.string().required('L\'adresse est requise'),
//       telephone: Yup.string().required('Le numéro de téléphone est requis'),
//       date_naissance: Yup.date().required('La date de naissance est requise'),
//       sexe: Yup.string().required('Le sexe est requis'),
//       numero_cnss: Yup.string().required('Le numéro CNSS est requis'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // Appel API pour enregistrer le patient
//         const response = await axios.post(`${PATIENT_API_URL}/register`, values);
//         console.log('Patient enregistré avec succès:', response.data);
//         // Réinitialise le formulaire après la soumission réussie
//         resetForm();
//       } catch (error) {
//         console.error('Erreur lors de l\'enregistrement du patient:', error);
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
//           <input
//             type="text"
//             id="nom"
//             name="nom"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.nom}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.nom && formik.errors.nom ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.nom}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
//           <input
//             type="text"
//             id="prenom"
//             name="prenom"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.prenom}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.prenom && formik.errors.prenom ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.prenom}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
// <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">Adresse:</label>
// <input
//   type="text"
//   id="adresse"
//   name="adresse"
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
//   value={formik.values.adresse}
//   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// />
//           {formik.touched.adresse && formik.errors.adresse ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.adresse}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">Téléphone:</label>
//           <input
//             type="text"
//             id="telephone"
//             name="telephone"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.telephone}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.telephone && formik.errors.telephone ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.telephone}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="date_naissance" className="block text-gray-700 text-sm font-bold mb-2">Date de naissance:</label>
//           <input
//             type="date"
//             id="date_naissance"
//             name="date_naissance"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.date_naissance}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.date_naissance && formik.errors.date_naissance ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.date_naissance}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="sexe" className="block text-gray-700 text-sm font-bold mb-2">Sexe:</label>
//           <select
//             id="sexe"
//             name="sexe"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.sexe}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="" label="Sélectionnez le sexe" />
//             <option value="Male" label="Male" />
//             <option value="Female" label="Female" />
//           </select>
//           {formik.touched.sexe && formik.errors.sexe ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.sexe}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="numero_cnss" className="block text-gray-700 text-sm font-bold mb-2">Numéro CNSS:</label>
//           <input
//             type="text"
//             id="numero_cnss"
//             name="numero_cnss"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.numero_cnss}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.numero_cnss && formik.errors.numero_cnss ? (
//             <p className="text-red-500 text-xs italic">{formik.errors.numero_cnss}</p>
//           ) : null}
//         </div>

//         <div className="mb-6">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             S'inscrire
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     adresse: '',
//     telephone: '',
//     date_naissance: '',
//     sexe: '',
//     type: '', // Patient, Medecin, Assistant
//     numero_cnss: '', // Champ spécifique au patient
//     service: '', // Champ spécifique au médecin
//     assistant: '', // Champ spécifique au médecin
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/register', formData);
//       console.log('Utilisateur enregistré avec succès:', response.data);
//       setFormData({
//         nom: '',
//         prenom: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         adresse: '',
//         telephone: '',
//         date_naissance: '',
//         sexe: '',
//         type: '',
//         numero_cnss: '',
//         service: '',
//         assistant: '',
//       });
//     } catch (error) {
//       console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
//           <input type="text" id="nom" name="nom" onChange={handleChange} value={formData.nom} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
//           <input type="text" id="prenom" name="prenom" onChange={handleChange} value={formData.prenom} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//           <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe:</label>
//           <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmer le mot de passe:</label>
//           <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">Adresse:</label>
//           <input type="text" id="adresse" name="adresse" onChange={handleChange} value={formData.adresse} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">Téléphone:</label>
//           <input type="text" id="telephone" name="telephone" onChange={handleChange} value={formData.telephone} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="date_naissance" className="block text-gray-700 text-sm font-bold mb-2">Date de naissance:</label>
//           <input type="date" id="date_naissance" name="date_naissance" onChange={handleChange} value={formData.date_naissance} />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="sexe" className="block text-gray-700 text-sm font-bold mb-2">Sexe:</label>
//           <select id="sexe" name="sexe" onChange={handleChange} value={formData.sexe}>
//             <option value="" label="Sélectionnez le sexe" />
//             <option value="Male" label="Male" />
//             <option value="Female" label="Female" />
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Type d'utilisateur:</label>
//           <div>
//             <label className="mr-4">
//               <input type="radio" name="type" value="patient" onChange={handleChange} checked={formData.type === 'patient'} />
//               Patient
//             </label>
//             <label className="mr-4">
//               <input type="radio" name="type" value="medecin" onChange={handleChange} checked={formData.type === 'medecin'} />
//               Médecin
//             </label>
//             <label>
//               <input type="radio" name="type" value="assistant" onChange={handleChange} checked={formData.type === 'assistant'} />
//               Assistant
//             </label>
//           </div>
//         </div>

//         {formData.type === 'patient' && (
//           <div className="mb-4">
//             <label htmlFor="numero_cnss" className="block text-gray-700 text-sm font-bold mb-2">Numéro CNSS:</label>
//             <input type="text" id="numero_cnss" name="numero_cnss" onChange={handleChange} value={formData.numero_cnss} />
//           </div>
//         )}

//         {formData.type === 'medecin' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Service:</label>
//               <input type="text" id="service" name="service" onChange={handleChange} value={formData.service} />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="assistant" className="block text-gray-700 text-sm font-bold mb-2">Assistant:</label>
//               <input type="text" id="assistant" name="assistant" onChange={handleChange} value={formData.assistant} />
//             </div>
//           </>
//         )}

//         <div className="mb-6">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             S'inscrire
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [serviceList, setServiceList] = useState([]);
  const [assistantList, setAssistant] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    adresse: '',
    telephone: '',
    date_naissance: '',
    sexe: '',
    type: '', // Patient, Medecin, Assistant
    numero_cnss: '', // Champ spécifique au patient
    service: '', // Champ spécifique au médecin
    assistant: '', // Champ spécifique au médecin
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(()=>{
    axios
    .get("http://localhost:8080/api/assistants")
    .then((r) => {
      console.log(r.data);
       setAssistant(r.data);
    })
    .catch(() => {
       console.log("Auth Error");
    });
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("foem:"+JSON.stringify(formData));
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      console.log('Utilisateur enregistré avec succès:', response.data);
      window.location.href = '/login';
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        adresse: '',
        telephone: '',
        date_naissance: '',
        sexe: '',
        type: '',
        numero_cnss: '',
        service: '',
        assistant: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            onChange={handleChange}
            value={formData.nom}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            onChange={handleChange}
            value={formData.prenom}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">Adresse:</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            onChange={handleChange}
            value={formData.adresse}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">Téléphone:</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            onChange={handleChange}
            value={formData.telephone}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date_naissance" className="block text-gray-700 text-sm font-bold mb-2">Date de naissance:</label>
          <input
            type="date"
            id="date_naissance"
            name="date_naissance"
            onChange={handleChange}
            value={formData.date_naissance}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sexe:</label>
          <div>
            <label className="mr-4">
              <input type="radio" name="sexe" value="M" onChange={handleChange} checked={formData.sexe === 'M'} />
              Homme
            </label>
            <label>
              <input type="radio" name="sexe" value="F" onChange={handleChange} checked={formData.sexe === 'F'} />
              Femme
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type d'utilisateur:</label>
          <div>
            <label className="mr-4">
              <input type="radio" name="type" value="patient" onChange={handleChange} checked={formData.type === 'patient'} />
              Patient
            </label>
            <label className="mr-4">
              <input type="radio" name="type" value="medecin" onChange={handleChange} checked={formData.type === 'medecin'} />
              Médecin
            </label>
            <label>
              <input type="radio" name="type" value="assistant" onChange={handleChange} checked={formData.type === 'assistant'} />
              Assistant
            </label>
          </div>
        </div>

        {formData.type === 'patient' && (
          <div className="mb-4">
            <label htmlFor="numero_cnss" className="block text-gray-700 text-sm font-bold mb-2">Numéro CNSS:</label>
            <input
              type="text"
              id="numero_cnss"
              name="numero_cnss"
              onChange={handleChange}
              value={formData.numero_cnss}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        {formData.type === 'medecin' && (
          <>
            <div className="mb-4">
              <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Service:</label>
              <select
                id="service"
                name="service"
                onChange={handleChange}
                value={formData.service}
                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" label="Sélectionnez le service" />
                <option value="657a3d71b4ddc012bf83d66f" label='cardiologie'/>
                <option value="657a3d71b4ddc012bf83d670" label="endocrinologie"/>
                <option value="657a3d71b4ddc012bf83d671" label='rhumatologie'/>

              
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="assistant" className="block text-gray-700 text-sm font-bold mb-2">Assistant:</label>
              <select
                id="assistant"
                name="assistant"
                onChange={handleChange}
                value={formData.assistant}
                className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" label="Sélectionnez l'assistant" />
                {
                  assistantList.map((assistant) =>{
                    const fullName= assistant.nom + " " + assistant.prenom;
                        return( <option key={assistant._id} value={assistant._id} label={fullName} />);
                  } )
                }
              </select>
            </div>
          </>
        )}
        <div className="mb-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};










///////////////////////////////////////////
// export default RegisterForm1;

// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const RegisterForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       nom: '',
//       prenom: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       adresse: '',
//       telephone: '',
//       date_naissance: '',
//       sexe: '',
//       type: '',
//       numero_cnss: '',
//       service: '',
//       assistant: '',
//     },
//     validationSchema: Yup.object({
//       nom: Yup.string().required('Le nom est requis'),
//       prenom: Yup.string().required('Le prénom est requis'),
//       email: Yup.string().email('Format email invalide').required('L\'email est requis'),
//       password: Yup.string().required('Le mot de passe est requis'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
//         .required('La confirmation du mot de passe est requise'),
//       adresse: Yup.string().required('L\'adresse est requise'),
//       telephone: Yup.string().required('Le téléphone est requis'),
//       date_naissance: Yup.date().required('La date de naissance est requise'),
//       sexe: Yup.string().required('Le sexe est requis'),
//       type: Yup.string().required('Le type d\'utilisateur est requis'),
//       numero_cnss: Yup.string().when('type', {
//         is: 'patient',
//         then: Yup.string().required('Le numéro CNSS est requis pour les patients'),
//         otherwise: Yup.string(),
//       }),
//       service: Yup.string().when('type', {
//         is: 'medecin',
//         then: Yup.string().required('Le service est requis pour les médecins'),
//         otherwise: Yup.string(),
//       }),
//       assistant: Yup.string().when('type', {
//         is: 'medecin',
//         then: Yup.string().required('L\'assistant est requis pour les médecins'),
//         otherwise: Yup.string(),
//       }),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post('http://localhost:5000/api/register', values);
//         console.log('Utilisateur enregistré avec succès:', response.data);
//         formik.resetForm();
//       } catch (error) {
//         console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
//           <input
//             type="text"
//             id="nom"
//             name="nom"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.nom}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.nom && formik.errors.nom ? (
//             <div className="text-red-500 text-sm">{formik.errors.nom}</div>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
//           <input
//             type="text"
//             id="prenom"
//             name="prenom"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.prenom}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.prenom && formik.errors.prenom ? (
//             <div className="text-red-500 text-sm">{formik.errors.prenom}</div>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="text-red-500 text-sm">{formik.errors.email}</div>
//           ) : null}
//         </div>


//         <div className="mb-4">
//           <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmer le mot de passe:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             onChange={handleChange}
//             value={formData.confirmPassword}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">Adresse:</label>
//           <input
//             type="text"
//             id="adresse"
//             name="adresse"
//             onChange={handleChange}
//             value={formData.adresse}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2">Téléphone:</label>
//           <input
//             type="text"
//             id="telephone"
//             name="telephone"
//             onChange={handleChange}
//             value={formData.telephone}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="date_naissance" className="block text-gray-700 text-sm font-bold mb-2">Date de naissance:</label>
//           <input
//             type="date"
//             id="date_naissance"
//             name="date_naissance"
//             onChange={handleChange}
//             value={formData.date_naissance}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Sexe:</label>
//           <div>
//             <label className="mr-4">
//               <input type="radio" name="sexe" value="homme" onChange={handleChange} checked={formData.sexe === 'homme'} />
//               Homme
//             </label>
//             <label>
//               <input type="radio" name="sexe" value="femme" onChange={handleChange} checked={formData.sexe === 'femme'} />
//               Femme
//             </label>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Type d'utilisateur:</label>
//           <div>
//             <label className="mr-4">
//               <input type="radio" name="type" value="patient" onChange={formik.handleChange} checked={formik.values.type === 'patient'} />
//               Patient
//             </label>
//             <label className="mr-4">
//               <input type="radio" name="type" value="medecin" onChange={formik.handleChange} checked={formik.values.type === 'medecin'} />
//               Médecin
//             </label>
//             <label>
//               <input type="radio" name="type" value="assistant" onChange={formik.handleChange} checked={formik.values.type === 'assistant'} />
//               Assistant
//             </label>
//             {formik.touched.type && formik.errors.type ? (
//               <div className="text-red-500 text-sm">{formik.errors.type}</div>
//             ) : null}
//           </div>
//         </div>

//         {formik.values.type === 'patient' && (
//           <div className="mb-4">
//             <label htmlFor="numero_cnss" className="block text-gray-700 text-sm font-bold mb-2">Numéro CNSS:</label>
//             <input
//               type="text"
//               id="numero_cnss"
//               name="numero_cnss"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.numero_cnss}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {formik.touched.numero_cnss && formik.errors.numero_cnss ? (
//               <div className="text-red-500 text-sm">{formik.errors.numero_cnss}</div>
//             ) : null}
//           </div>
//         )}

//         {formik.values.type === 'medecin' && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Service:</label>
//               <select
//                 id="service"
//                 name="service"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.service}
//                 className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               >
//                 <option value="" label="Sélectionnez le service" />
//                 {/* Ajoutez ici les options pour les services */}
//               </select>
//               {formik.touched.service && formik.errors.service ? (
//                 <div className="text-red-500 text-sm">{formik.errors.service}</div>
//               ) : null}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="assistant" className="block text-gray-700 text-sm font-bold mb-2">Assistant:</label>
//               <select
//                 id="assistant"
//                 name="assistant"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.assistant}
//                 className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               >
//                 <option value="" label="Sélectionnez l'assistant" />
//                 <option value="assistant1" label="Assistant1" />
//                 {/* Ajoutez ici les options pour les assistants */}
//               </select>
//               {formik.touched.assistant && formik.errors.assistant ? (
//                 <div className="text-red-500 text-sm">{formik.errors.assistant}</div>
//               ) : null}
//             </div>
//           </>
//         )}

//         <div className="mb-6">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             S'inscrire
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default RegisterForm;
