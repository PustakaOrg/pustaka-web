import { OrgCard } from "./OrgCard";

const OrgChart = () => {
  return (
    <div className="bg-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 tracking-tighter md:text-4xl/tight">Struktur Organisasi Perpustakaan</h2>

      {/* Kepala */}
      <div className="flex justify-center mb-8">
        <OrgCard
          name="Bahtiar, M.Pd."
          title="Kepala Perpustakaan"
          image="/Bahtiar.jpg"
          borderColor="border-primary"
        />
      </div>

      {/* Anggota */}
      <div className="flex justify-center gap-6 flex-wrap">
        <OrgCard
          name="Nuur Jannah Hayati, S.Pd."
          title="Layanan Teknis"
          image="/Nuur Jannah Hayati, S.Pd.jpeg"
          borderColor="border-primary"
        />
        <OrgCard
          name="Diana Theresia Emelda"
          title="Layanan Sirkulasi"
          image="/Diana Theresia Emelda.jpeg"
          borderColor="border-primary"
        />
        <OrgCard
          name="Erni Yavira"
          title="Layanan Teknologi Informasi (TI)"
          image="/Erni Yavira.jpg"
          borderColor="border-primary"
        />
        <OrgCard
          name="M. Setiawan Daulfiqar Azhar, Amd "
          title="Layanan Referensi"
          image="/azhar.jpg"
          borderColor="border-primary"
        />
      </div>
    </div>
  );
};

export default OrgChart;
