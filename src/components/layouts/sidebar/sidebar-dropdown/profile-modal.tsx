import { Input } from "@/components/ui/input/Input";

const ProfileModal = ({ tokenData }: any) => {
  const firstName = tokenData?.given_name ?? "";
  const lastName = tokenData?.family_name ?? "";
  return (
    <div className="profile-modal">
      <Input
        label="Adı - Soyadı"
        disabled={true}
        value={`${firstName} ${lastName}`}
      />
      <Input label="E-Mail" disabled={true} value={tokenData?.email ?? "-"} />
      <Input
        label="Kullanıcı Adı"
        disabled={true}
        value={tokenData?.preferred_username ?? '-'}
      />
      <Input
        label="Kullanıcı Rolü"
        disabled={true}
        value={tokenData?.role ?? "-"}
      />
    </div>
  );
};

export default ProfileModal;
