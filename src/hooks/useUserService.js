import axios from 'axios';

const userService = axios.create({
    baseURL: 'https://rentstate.dmtsg.com/api/gateway-service',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createUser = async (userData) => {
    try {
        const response = await userService.post(`/auth/api/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (updateUserResource, token) => {
    try {
        const response = await userService.put(`/api/v1/users`, updateUserResource, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const getUser = async (userId, token) => {
    const response = await userService.get(`/api/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getAllUsers = async (token) => {
    try {
        const response = await userService.get(`/api/v1/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const deleteUser = async (userId, token) => {
    try {
        const response = await userService.delete(`/api/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const uploadProfilePicture = async (userId, file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await userService.post(`/api/v1/users/upload-profile-picture/${userId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const createContact = async (userId, contactUsername, token) => {
    try {
        const response = await userService.post(`/api/v1/users/${userId}/contacts/${contactUsername}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

export const getContacts = async (userId, token) => {
    try {
        const response = await userService.get(`/api/v1/users/${userId}/contacts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

export const getContactDetails = async (usernames, token) => {
    try {
        const contactDetails = await Promise.all(usernames.map(async (username) => {
            const response = await userService.get(`/api/v1/users/username/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }));
        return contactDetails;
    } catch (error) {
        console.error('Error fetching contact details:', error);
        throw error;
    }
};