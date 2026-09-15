// app/about/page.tsx
//
// This is a whole page. A folder inside app/ with a file called page.tsx
// in it IS a route, and the folder's name is the address. Nothing is
// registered anywhere -- there is no list of routes in this project.
export default function AboutPage() {
  return (
    <main>
      <h2>About us</h2>
      <p>We have been grinding beans since Tuesday.</p>
    </main>
  );
}
