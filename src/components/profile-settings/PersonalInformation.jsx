import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import LinksProfiles from "./LinksProfiles";
import PROFILE from "../../assets/avatar.jpg";
import iconEdit from "../../assets/icon/edit.svg";
import iconDelete from "../../assets/icon/delete.svg";
import {
  isNotEmpty,
  validateEmail,
  validatePhoneNumber,
  validateNumCnss,
} from "../../utils/validation.util";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [userInputs, setUserInputs] = useState({
    nom: { value: "", message: "" },
    prenom: { value: "", message: "" },
    email: { value: "", message: "" },
    adresse: { value: "", message: "" },
    date_naissance: { value: "", message: "" },
    telephone: { value: "", message: "" },
    sexe: { value: "", message: "" },
    numero_cnss: { value: "", message: "" },
  });

  const [image, setImage] = useState("");

  const resetUserInputs = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
    setImage(storedUser.image || "");
    setUserInputs((prevUserInputs) => ({
      ...prevUserInputs,
      ...Object.fromEntries(
        Object.entries(storedUser).map(([key, value]) => [
          key,
          { value: value || "", message: "" },
        ])
      ),
    }));
  };

  const handleFileSelected = async (e) => {
    if (e.target.files) {
      const file = Array.from(e.target.files)[0];
      const base64 = await readFileAsDataURL(file);

      if (base64) {
        updateUserImage(base64);
      }
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const updateUserImage = async (base64) => {
    try {
      await axios.put(
        "http://localhost:8080/api/updateImagePatient",
        { _id: user.id, base64 },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.image = base64;
      setImage(base64);
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      console.error("Error updating user image:", error.message);
    }
  };
  const deleteimage = async () => {
    try {
      await axios.delete("http://localhost:8080/api/deleteImagePatient", {
        headers: { Authorization: `Bearer ${authToken}` },
        data: { _id: user.id },
      });

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.image = "";
      setImage("");
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      console.error("Error deleting user image:", error.message);
    }
  };

  useEffect(() => {
    resetUserInputs();
    const storedToken = localStorage.getItem("token");
    
    setAuthToken(storedToken);
  }, []);

  const handleCancel = () => {
    setIsEditing(false);
    resetUserInputs();
  };

  const handleSubmit = () => {
    if (!user) {
      console.error("User is null");
      return;
    }
    // Check for validation errors
    if (
      userInputs.nom.message !== "" ||
      userInputs.email.message !== "" ||
      userInputs.adresse.message !== "" ||
      userInputs.telephone.message !== "" ||
      userInputs.prenom.message !== "" ||
      userInputs.numero_cnss.message !== ""
    ) {
      return;
    }
    const updatedPatientData = {
      _id: user.id,
      nom: userInputs.nom.value,
      prenom: userInputs.prenom.value,
      email: userInputs.email.value,
      adresse: userInputs.adresse.value,
      telephone: userInputs.telephone.value,
      date_naissance: userInputs.date_naissance.value,
      sexe: userInputs.sexe.value,
      numero_cnss: userInputs.numero_cnss.value,
    };

    const authToken = localStorage.getItem("token");

    // Set the token in the Axios headers
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    //
    // const onUpload = () => {};

    axios
      .put(
        "http://localhost:8080/api/updatePatient",
        updatedPatientData,
        axiosConfig
      )
      .then((response) => {
        // Update user in state and localStorage with the new data
        const updatedUser = {
          ...user,
          nom: userInputs.nom.value,
          prenom: userInputs.prenom.value,
          email: userInputs.email.value,
          adresse: userInputs.adresse.value,
          date_naissance: userInputs.date_naissance.value,
          telephone: userInputs.telephone.value,
          sexe: userInputs.sexe.value,
          numero_cnss: userInputs.numero_cnss.value,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
          bodyClassName: "toast-body",
          progressClassName: "toast-progress",
        });
        console.log("Updated Patient:", response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating patient:", error.response.data);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  return (
    <div className="h-full w-full bg-text-blue-600 p-0 md:px-10 md:pt-12 md:pb-16">
      <div className="bg-white py-6 px-4 rounded-xl md:py-10 md:px-12">
        <LinksProfiles />

        <div className="flex flex-col gap-12 mt-12 md:flex-row">
          <div className="flex flex-col gap-2 items-center">
            <div className="relative w-48 h-48">
              <img
                className=" border border-darkGrey rounded-full w-48 h-48 rounded-full"
                src={image === "" ? PROFILE : image}
                alt="user photo"
              />
              <div className="flex gap-4 mt-4  justify-center">
                <label className="relative w-10 h-10 bg-cyan-500 rounded-full cursor-pointer flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelected}
                    className="hidden"
                  />
                  <img
                    className="m-auto"
                    src={iconEdit}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                </label>
                <label className="relative w-10 h-10 bg-cyan-500 rounded-full cursor-pointer flex items-center">
                  <img
                    onClick={deleteimage}
                    className="m-auto"
                    src={iconDelete}
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="flex items-center flex-col gap-4 justify-between md:flex-row">
              <h3 className="font-bold text-2xl text-sky-900">
                Information Personnel
              </h3>
              {isEditing && (
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => handleCancel()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                  >
                    <span className={` font-medium text-base `}>Annuler</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                  >
                    <span className={` font-medium text-base`}>
                      Sauvegarder
                    </span>
                  </button>
                </div>
              )}
              {!isEditing && (
                <button className="relative w-12 h-12 bg-gray-600 rounded-full">
                  <img
                    onClick={() => {
                      handleEdit();
                    }}
                    className="m-auto w-10 h-10"
                    src={iconEdit}
                    alt="avatar"
                  ></img>
                </button>
              )}
            </div>

            <hr className="my-2 border border-darkGrey" />
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 ">
                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Nom
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        nom: {
                          value: e.target.value,
                          message: isNotEmpty("nom", e.target.value),
                        },
                      })
                    }
                    value={userInputs?.nom?.value || ""}
                    readOnly={!isEditing}
                    placeholder={
                      isEditing ? "Enter your firstname" : "Firstname"
                    }
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full "
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs.nom.message}
                  </p>
                </div>
                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Prenom
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        prenom: {
                          value: e.target.value,
                          message: isNotEmpty("prenom", e.target.value),
                        },
                      })
                    }
                    readOnly={!isEditing}
                    value={userInputs?.prenom?.value || ""}
                    placeholder={isEditing ? "Enter your lastname" : "Lastname"}
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs.prenom.message}
                  </p>
                </div>
                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    value={userInputs?.email?.value}
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        email: {
                          value: e.target.value,
                          message: validateEmail(e.target.value),
                        },
                      })
                    }
                    readOnly={!isEditing}
                    placeholder={isEditing ? "Enter your email" : "Email"}
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs.email.message}
                  </p>
                </div>

                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900 `}
                    >
                      Address
                    </span>
                  </label>
                  <input
                    type="text"
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        adresse: {
                          value: e.target.value,
                          message: isNotEmpty("adresse", e.target.value),
                        },
                      })
                    }
                    value={userInputs?.adresse?.value}
                    placeholder={isEditing ? "Enter your address" : "Address"}
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs?.adresse?.message}
                  </p>
                </div>

                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Date de Naissance
                    </span>
                  </label>
                  <input
                    type="date"
                    value={userInputs?.date_naissance?.value}
                    onChange={(e) => {
                      setUserInputs({
                        ...userInputs,
                        date_naissance: {
                          value: e.target.value,
                        },
                      });
                    }}
                    readOnly={!isEditing}
                    placeholder={
                      isEditing ? "Enter your date_naissance" : "date_naissance"
                    }
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                </div>

                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Telephone
                    </span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        telephone: {
                          value: e.target.value,
                          message: validatePhoneNumber(e.target.value),
                        },
                      })
                    }
                    readOnly={!isEditing}
                    value={userInputs?.telephone?.value}
                    placeholder={
                      isEditing ? "Enter your Telephone" : "Telephone"
                    }
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs?.telephone?.message}
                  </p>
                </div>
                <div>
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Sexe
                    </span>
                  </label>
                  {isEditing ? (
                    <select
                      required
                      onChange={(e) =>
                        setUserInputs({
                          ...userInputs,
                          sexe: {
                            value: e.target.value,
                            // message: isNotEmpty("gender", e.target.value),
                          },
                        })
                      }
                      value={userInputs.sexe.value ?? "Choose your sexe"}
                      className="h-12 px-3 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                    >
                      <option disabled>Choose your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <div className="relative form-control">
                      <input
                        type="text"
                        readOnly={!isEditing}
                        value={userInputs?.sexe.value || ""}
                        className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="relative form-control">
                  <label className="label">
                    <span
                      className={`label-text  font-medium text-base text-sky-900`}
                    >
                      Numero de CNSS
                    </span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setUserInputs({
                        ...userInputs,
                        numero_cnss: {
                          value: e.target.value,
                          // message: validateNumCnss(e.target.value),
                        },
                      })
                    }
                    readOnly={!isEditing}
                    value={userInputs?.numero_cnss?.value}
                    placeholder={
                      isEditing ? "Enter your Telephone" : "Telephone"
                    }
                    className="h-12 px-4 border border-gray-500 rounded-md bg-white text-sky-900 w-full"
                  />
                  <p
                    className={`absolute w-full  text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {userInputs?.numero_cnss?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
