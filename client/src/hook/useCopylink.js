function useCopylink() {
  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      alert("คัดลอกลิงก์ไปยังคลิปบอร์ด สำเร็จแล้ว");
    } catch (err) {
      console.error("request error");
      alert("คัดลอกลิงก์ไปยังคลิปบอร์ด ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  };
  return { copyLink };
}

export default useCopylink;
