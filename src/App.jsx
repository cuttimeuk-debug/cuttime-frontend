export default function CuttimeStarterApp() {
  const [view, setView] = useState("home"); // home | login | signup | dashboard | customer
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ct_auth") || "null"); } catch { return null; }
  });

  useEffect(() => {
    document.documentElement.classList.add("h-full");
    document.body.classList.add("h-full", "m-0");
  }, []);

  // rest of code...
}
