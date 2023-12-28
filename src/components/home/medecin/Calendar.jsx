import Datepicker from "tailwind-datepicker-react";
import React, { useState } from "react";


const options = {
	title: "Choisir une date",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-white-700",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		prev: () => <span>Preced</span>,
		next: () => <span>Suiv</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

function Calendar(props){
  const [show, setShow] = useState(false);
	const handleChange = (selectedDate) => {
		console.log(selectedDate);
		props.onChange(selectedDate);
	}
	const handleClose = (state) => {
		setShow(state)
	}

	return (
		<div className="flex flex-col datapicker-style">
			<Datepicker  options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}
export default Calendar;