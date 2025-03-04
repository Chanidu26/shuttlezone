import { RiSecurePaymentFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { RiPhoneFindFill } from "react-icons/ri";
import { IoNotificationsCircleSharp } from "react-icons/io5";
export const services = [
    {
        name: "Court Booking",
        desc: "Easily book your preferred badminton court based on availability. Choose the time slots that work best for you.",
        bgColor: "rgba(1, 181, 197, .2)",
        icon: <FaBookOpen />,
        textColor: "#01B5C5",
      },
      {
        name: "Create Your Own Court",
        desc: "Set up and customize your own court for private games or events. Share the court details with your group.",
        bgColor: "rgba(254, 182, 13, .2)",
        icon: <MdCreateNewFolder />,
        textColor: "#FEB60D",
      },
      {
        name: "Find court near you",
        desc: "Find and book your preferred badminton court near you. Choose the time slots that work best for you.",
        bgColor: "rgba(151, 113, 255, .2)",
        icon : <RiPhoneFindFill />,
        textColor: "#9771FF",
      },
      {
        name: "Secure Payment",
        desc: "Make hassle-free payments through a secure platform, ensuring your transactions are safe and protected.",
        bgColor: "rgba(151, 113, 255, .2)",
        icon: <RiSecurePaymentFill />,
        textColor: "#9771FF",
      },
      {
        name: "Real-Time Updates",
        desc: "Receive instant notifications for court availability and booking confirmations. Stay updated on changes in real-time.",
        bgColor: "rgba(244, 67, 54, .2)",
        icon : <IoNotificationsCircleSharp />,
        textColor: "#F44336",
      },
]