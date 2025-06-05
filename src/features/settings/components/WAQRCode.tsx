import React, { useEffect, useState } from "react";
import useWAQRCode from "../hooks/useWAQRCode";
import { Smartphone } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";

const WAQRCode = () => {
	const { waQR } = useWAQRCode();
  // const waQR = {qrcode_raw: "Someasdasdaasdasdasdasd12321aasd123123123123asdasdasd12312321asdasdqe123kbaskd9812372183111123"}

	return (
		<div className="flex sm:flex-col items-center gap-8 space-y-6">
			<div className="relative">
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
        {waQR?.qrcode_raw && <QRCodeSVG value={waQR.qrcode_raw} size={220} />}
				</div>
				<div className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2.5">
					<Smartphone className="h-5 w-5 text-white" />
				</div>
			</div>

			<h3 className="text-lg font-semibold text-gray-900">Scan to Connect</h3>
		</div>
	);
};

export default WAQRCode;
