import React, { useEffect, useState } from "react";

const PersonalInformation = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        // Parse the JSON string to get the user object
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div className="flex flex-col gap-12 mt-12 md:flex-row">
          <div className="grow">
            <div className="flex h-12 items-center flex-col gap-4 justify-between md:flex-row">
              <h3 className={`font-bold text-2xl text-darkGrey`}>
                Personal Information
              </h3>
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    // onClick={() => handleCancel()}
                    className="btn btn-outline border-lightBlue hover:bg-transparent"
                  >
                    <span className={`font-medium text-base text-lightBlue`}>
                      Cancel
                    </span>
                  </button>
                  <button
                    type="button"
                    // onClick={() => handleSubmit()}
                    className="btn bg-lightBlue border-lightBlue hover:bg-lightBlue"
                  >
                    <span className={`font-medium text-base text-lightGrey`}>
                      Save changes
                    </span>
                  </button>
                </div>
              )}
              {!isEditing && (
                <button
                  onClick={() => {
                    // handleEdit()
                  }}
                  className="relative w-9 h-9 bg-gray-600 rounded-full"
                >
                  {/* <Image
                                  className="m-auto"
                                  src="/assets/icons/edit.svg"
                                  alt="avatar"
                                  width={20}
                                  height={20}
                              ></Image> */}
                </button>
              )}
            </div>
            <p
              className={`w-full text-base font-bold text-start text-red-500 bottom-2 px-2`}
            >
              {/* {updateUserInfoError} */}
            </p>
            <hr className="my-2 border border-darkGrey" />
            <div>
              <div className="w-full max-w-3xl grid grid-rows-3 gap-4 justify-items-start md:grid-flow-col">
                <div className="relative form-control w-full max-w-xs">
                  <label className="label">
                    <span
                      className={`label-text font-medium text-base text-darkGrey`}
                    >
                      Nom
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    value="bla bla"
                    readOnly={!isEditing}
                    placeholder={
                      isEditing ? "Enter your firstname" : "Firstname"
                    }
                    className="input input-bordered w-full max-w-xs bg-white text-darkGrey"
                  />
                  <p
                    className={`absolute w-full text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {/* {userInputs.firstname.message} */}
                  </p>
                </div>

                <div className="relative form-control w-full max-w-xs">
                  <label className="label">
                    <span
                      className={`label-text font-medium text-base text-darkGrey`}
                    >
                      Prenom
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    value={user.prenom}
                    readOnly={!isEditing}
                    placeholder={
                      isEditing ? "Enter your firstname" : "Firstname"
                    }
                    className="input input-bordered w-full max-w-xs bg-white text-darkGrey"
                  />
                  <p
                    className={`absolute w-full text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {/* {userInputs.firstname.message} */}
                  </p>
                </div>

                <div className="relative form-control w-full max-w-xs">
                  <label className="label">
                    <span
                      className={`label-text font-medium text-base text-darkGrey`}
                    >
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user.email}
                    readOnly={!isEditing}
                    placeholder={isEditing ? "Enter your email" : "Email"}
                    className="input input-bordered w-full max-w-xs bg-white text-darkGrey"
                  />
                  <p
                    className={`absolute w-full text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                  >
                    {/* {userInputs.email.message} */}
                  </p>
                </div>
              </div>
              <div className="relative form-control w-full md:max-w-3xl">
                <label className="label">
                  <span
                    className={`label-text font-medium text-base text-darkGrey`}
                  >
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  // onChange={(e) =>
                  // 	setUserInputs({
                  // 		...userInputs,
                  // 		address: { value: e.target.value, message: "" },
                  // 	})
                  // }
                  readOnly={!isEditing}
                  value={user.adresse}
                  placeholder={isEditing ? "Enter your address" : "Address"}
                  className="input input-bordered w-full max-w-3xl bg-white text-darkGrey"
                />
                <p
                  className={`absolute w-full text-base font-normal text-start text-red-500 -bottom-6 px-2`}
                >
                  {/* {userInputs.address.message} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default PersonalInformation;
