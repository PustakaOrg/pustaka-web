import React, { useEffect, useState } from "react";
import useWAQRCode from "../hooks/useWAQRCode";
import QRCode from "qrcode";

const WAQRCode = () => {
	const { waQR } = useWAQRCode();
	const [qr, setQrCodeUrl] = useState("");

	useEffect(() => {
		const generateQRCode = async () => {
			try {
				const url = await QRCode.toDataURL(waQR?.qrcode_raw, {
					width: 120,
					margin: 1,
					color: {
						dark: "#1f2937",
						light: "#ffffff",
					},
				});
				setQrCodeUrl(url);
			} catch (error) {
				console.error("Error generating QR code:", error);
			}
		};

		generateQRCode();
	}, [waQR]);

	return (
		<div className="inline-block bg-white p-3 rounded-xl shadow-sm mb-3">
			{qr && (
				<img
					src={qr}
					alt="QR Code"
					width={250}
					height={250}
					className="rounded-lg"
				/>
			)}
		</div>
	);
};

export default WAQRCode;
