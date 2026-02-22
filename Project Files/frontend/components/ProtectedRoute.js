function ProtectedRoute({ Component }) {
  const isLoggedIn = true; // TEMP (we'll add auth later)
  return isLoggedIn ? <Component /> : <p>Please login</p>;
}

export default ProtectedRoute;
