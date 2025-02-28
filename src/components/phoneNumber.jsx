import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

// eslint-disable-next-line react/prop-types
function PhoneNumber({ value, onChange }) {
  const handlePhoneChange = (phone) => {
    // Ensure the phone number starts with '+'
    if (phone && !phone.startsWith("+")) {
      phone = `+${phone}`;
    }
    onChange(phone);
  };

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={handlePhoneChange} // Use modified handler
      enableSearch={true}
      searchPlaceholder="Select country"
      country={"us"} // Set a default country
      international // Ensures international mode with the `+` sign
    />
  );
}

export default PhoneNumber;
