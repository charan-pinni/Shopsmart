function AdminProtectedRoute({ Component }) {
  const isAdmin = localStorage.getItem("admin");
  return isAdmin ? <Component /> : <p>Admin access required</p>;
}

export default AdminProtectedRoute;
