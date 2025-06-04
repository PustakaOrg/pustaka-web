import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Member } from "~/types/entities/Member";

interface MemberCardProps {
	member: Member;
	backgroundUrl?: string;
}

const cardWidth = 670; // ≈ 85.6mm @ 200 DPI
const cardHeight = 421; // ≈ 53.98mm @ 200 DPI
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
				{/* <img */}
				{/* 	src={member.profile_picture} */}
				{/* 	alt="Foto" */}
				{/* 	style={{ */}
				{/* 		position: "absolute", */}
				{/* 		top: "16px", */}
				{/* 		left: "16px", */}
				{/* 		width: "48px", */}
				{/* 		height: "48px", */}
				{/* 		borderRadius: "50%", */}
				{/* 		border: "2px solid white", */}
				{/* 	}} */}
				{/* /> */}
				<div
					style={{
						position: "absolute",
						top: "120px",
						left: "50px",
						right: "50px",
						color: "black",
					}}
				>
					<p
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "24px",
						}}
					>
						Kartu Anggota Perpustakaan
					</p>
				</div>

				{/* Nama dan Nis */}
				<div
					style={{
						position: "absolute",
						top: "170px",
						left: "50px",
						color: "black",
					}}
				>
					<table>
						<tbody>
							<tr>
								<td style={{ fontSize: "20px", }}>Nama</td>
								<td style={{ fontSize: "20px", paddingLeft: "8px" }}>
									{member.account.fullname}
								</td>
							</tr>
							<tr>
								<td style={{ fontSize: "20px"}}>NIS</td>
								<td style={{ fontSize: "20px", paddingLeft: "8px" }}>
									{member.nis}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* QR Code */}
				<div
					style={{
						position: "absolute",
						bottom: "50px",
						right: "50px",
						backgroundColor: "white",
						padding: "4px",
						borderRadius: "4px",
					}}
				>
					<QRCodeSVG value={member.id} size={100} />
				</div>

				{/* Tanggal Berlaku */}
				<p
					style={{
						position: "absolute",
						bottom: "20px",
						right: "50px",
						color: "red",
						fontSize: "16px",
					}}
				>
					Berlaku s/d: {member.expires_date}
				</p>
			</div>
		);
	},
);

export default MemberCard;
