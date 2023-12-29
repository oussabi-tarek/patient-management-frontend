import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import LinksProfiles from "./LinksProfiles";
import PROFILE from "../../assets/avatar.jpg";
import iconEdit from "../../assets/icon/edit.svg";
import {
  isNotEmpty,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/validation.util";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const initialUserInputs = {
    nom: { value: "", message: "" },
    prenom: { value: "", message: "" },
    email: { value: "", message: "" },
    adresse: { value: "", message: "" },
    date_naissance: { value: "", message: "" },
    telephone: { value: "", message: "" },
    sexe: { value: "", message: "" },
    numero_cnss: { value: "", message: "" },
  };

  const [userInputs, setUserInputs] = useState(initialUserInputs);

  // Inside the resetUserInputs function
  const resetUserInputs = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Fix: Set the parsed user object, not the string
        setUserInputs((prevUserInputs) => ({
          ...prevUserInputs,
          ...Object.fromEntries(
            Object.entries(parsedUser).map(([key, value]) => [
              key,
              { value: value || "", message: "" },
            ])
          ),
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  };

  useEffect(() => {
    resetUserInputs();
  }, []);

  const handleCancel = () => {
    setIsEditing(false);
    resetUserInputs();
    console.log(userInputs);
  };

  const handleSubmit = () => {
    if (!user) {
      console.error("User is null");
      return;
    }
    // Check for validation errors
    // if (
    //   userInputs.nom.message !== "" ||
    //   userInputs.prenom.message !== "" ||
    //   userInputs.email.message !== "" ||
    //   userInputs.adresse.message !== "" ||
    //   userInputs.telephone.message !== "" ||
    //   userInputs.date_naissance.message !== "" ||
    //   userInputs.sexe.message !== "" ||
    //   userInputs.numero_cnss.message !== ""
    // ) {
    //   return;
    // }
    console.log(user);
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

    axios
      .put(
        "http://localhost:8086/api/updatePatient",
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
                src={PROFILE}
                alt="user photo"
              />
            </div>
          </div>
          <div className="grow">
            <div className="flex items-center flex-col gap-4 justify-between md:flex-row">
              <h3 className="font-bold text-2xl text-sky-900">
                Personal Information
              </h3>
              {isEditing && (
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => handleCancel()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                  >
                    <span className={` font-medium text-base `}>Cancel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
                  >
                    <span className={` font-medium text-base`}>
                      Save changes
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
                          // message: validatePhoneNumber(e.target.value),
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
                    {/* {userInputs?.numero_cnss?.message} */}
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
