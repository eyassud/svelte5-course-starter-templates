<script>
  import { goto } from "$app/navigation";
  import Button from "./Button.svelte";

  function goToContactForm() {
    goto("/#contact-form");
  }
</script>

<nav class="navbar default-margin">
  <a class="logo" href="/">NF</a>
  <div class="navbar-links">
    <a class="nav-link" href="/#about-me">About Me</a>
    <a class="nav-link" href="/#my-work">work</a>
    <Button className="nav-bar" onclick={goToContactForm}>Contact</Button>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .logo {
    font-size: 35px;
    font-weight: bold;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .nav-link:hover {
    text-decoration: underline;
  }
</style>
