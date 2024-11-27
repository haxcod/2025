const LanguageDialog = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-70 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}
    >
      <div className={`rounded-t-[4.266667vw] flex flex-col max-h-[80%] overflow-hidden text-[#323233] fixed bottom-0 left-0 w-full box-border bg-white transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={(e) => e.stopPropagation()} >
        <div className="flex-[1_auto] overflow-y-auto">
          {['English', 'हिन्दी', 'தமிழ்', 'తెలుగు'].map((lang, index) => (
            <button key={index} className="block w-full p-[3.733333vw_4.266667vw] text-[4.266667vw] bg-white border-none cursor-pointer active:bg-slate-50" style={{ lineHeight: '5.866667vw' }} onClick={onClose}>
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageDialog;
