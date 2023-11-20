import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import {ContactWrapper} from  "./contact.styles";
import { useState } from "react";
import {TbMessage as Message} from 'react-icons/tb'
import { IoCallOutline as Phone} from "react-icons/io5";
import { PiHouseLight as House } from "react-icons/pi";
import ContactHeader from "@/assets/images/contactHeader.png";

export default function ContactPage() {
    return (
        <GeneralLayout>
            <ContactWrapper>
                <div className="contact__header" style={{ backgroundImage: `url(${ContactHeader.src})` }}>
                    <h2>Contact Us</h2>
                    <p>Get in touch with us; we`re here to help! Have questions, feedback, or need assistance? Reach out, and our dedicated team will assist you promptly.</p>
                </div>

                <section className="form__container">
                    <form className="form">
                        <div className="form__inputs">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" name="user_name" id="name" required/>
                        </div>
                        <div className="form__inputs">
                        <label htmlFor="email">Email Address</label>
                            <input type="text" name="user_email" id="email" required/>
                        </div>

                        <div className="form__inputs">
                            <label htmlFor="message">Message</label>
                            <textarea name="user_message" id="message" cols="30" rows="10"></textarea>
                        </div>
                        <button type="submit" className="form__submit__btn">  Send Message</button>
                    </form>

                    <div className="info">
                        <h2>Info</h2>
                        <div className="admin__mail admin__details">
                            <Message className="contact__icon"/>
                            <p><a href="mailto:loremipsum@gmail.com">loremipsum@gmail.com</a></p>
                        </div>
                        <div className="admin__contact admin__details">
                        <Phone  className="contact__icon"/>
                        <p><a href="tel:+2347011067109">+2347011067109</a></p>
                        </div>
                        <div className="admin__location admin__details">
                        <House  className="contact__icon"/>
                        <p>LoremIpsum Lorem Ipsumlorem</p>
                        </div>
                    </div>
                </section>
            </ContactWrapper>
        </GeneralLayout>
    );
}