---
layout: base
permalink: index.html

title: Ben Gauslin
description: Ben’s home page on the World Wide Web
classname: home
---
# Ben Gauslin

<details-plus accordion>
  <details id="about">
    <summary>
      <h2>About</h2>
    </summary>

    Hello, I’m a former Chicago architect, Google engineer, and design professor who’s currently learning Spanish the hard way while living in Madrid.
    
    <small>_...que es muy lento pero muy emocionante y mucho más valioso. ¡Bienvenidos y gracias por visitarme!_</small>

    <img src="images/selfie.jpg" alt="" class="avatar">
  </details>

  {% include 'projects.njk' %}

  <details id="contact">
    <summary>
      <h2>Contact</h2>
    </summary>

    You can reach me via email, text, or voicemail.

    {% include 'contact.njk' %}

  </details>
</details-plus>
