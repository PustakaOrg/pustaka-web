import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Member } from "~/types/entities/Member";

interface MemberCardProps {
	member: Member;
	backgroundUrl?: string;
}

const cardWidth = 650;
const cardHeight = 408;
const MemberCard = React.forwardRef<HTMLDivElement, MemberCardProps>(
	({ member, backgroundUrl }, ref) => {
		return (
			<div
				ref={ref}
				style={{
					position: "relative",
					overflow: "hidden",
					width: `${cardWidth}px`,
					height: `${cardHeight}px`,
					backgroundImage: `url(${backgroundUrl || "/bg.jpg"})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/20" />

				{/* Foto profil */}
				<img
					src={member.profile_picture}
					alt="Foto"
					style={{
						position: "absolute",
						top: "16px",
						left: "16px",
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						border: "2px solid white",
					}}
				/>

				{/* Nama dan Nis */}
				<div
					style={{
						position: "absolute",
						top: "16px",
						left: "80px",
						color: "black",
					}}
				>
					<h2 style={{ fontSize: "32px", fontWeight: "bold" }}>
						{member.account.fullname}
					</h2>
					<p style={{ fontSize: "12px" }}>NIS: {member.nis}</p>
				</div>

				{/* QR Code */}
				<div
					style={{
						position: "absolute",
						bottom: "16px",
						left: "16px",
						backgroundColor: "white",
						padding: "4px",
						borderRadius: "4px",
					}}
				>
					<QRCodeSVG value={member.id} size={48} />
				</div>

				{/* Tanggal Berlaku */}
				<p
					style={{
						position: "absolute",
						bottom: "20px",
						right: "16px",
						color: "white",
						fontSize: "12px",
					}}
				>
					Berlaku s/d: 31 Des 2025
				</p>
			</div>
		);
	},
);

export default MemberCard;
