import axios from "axios";

export const contactUs = async (payload) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/buyer/contact-us`,
        payload
    );

    return data;
};
