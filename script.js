
// ==========================================
// THE VEIL — ARCHIVE SYSTEM
// ==========================================

// LOADING SCREEN
const loading = document.getElementById('loadingScreen');
const percent = document.getElementById('loadingPercent');

if (loading && percent) {
  let n = 0;

  const loader = setInterval(() => {
    n = Math.min(100, n + Math.floor(Math.random() * 13) + 5);
    percent.textContent = String(n).padStart(2, '0') + '%';

    if (n >= 100) {
      clearInterval(loader);
      setTimeout(() => loading.classList.add('done'), 350);
    }
  }, 110);
}

// CURSOR GLOW
const glow = document.getElementById('cursorGlow');

if (glow) {
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// MOBILE MENU
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.topbar nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ==========================================
// ENTITY DATABASE
// ==========================================

const entities = {
  'The Hollow': {
    number: '001',
    date: 'OCT 31, 1983',
    status: 'UNCLASSIFIED',
    location: 'BLACKWOOD FOREST',
    description: `CASE SUMMARY:

The first documented sighting occurred near the northern trail of Blackwood Forest in October 1983.

Witnesses describe an unnaturally tall, human-shaped silhouette standing between the trees. Its face appears completely empty, almost as if something has erased it.

It never moves while directly observed.

However, witnesses report that after looking away, the figure is always closer.

BEHAVIOR:
The entity appears during periods of heavy fog. It does not respond to voices, lights or physical objects.

ORIGIN:
Unknown. No photographs have ever captured its full shape.

LAST RECORDED SIGHTING:
November 14, 2026. Northern Blackwood Trail.

FINAL NOTE:
An investigator reported seeing the figure outside his bedroom window. The window was on the third floor.`
  },

  'The Choir': {
    number: '002',
    date: 'NOV 07, 1987',
    status: 'ACTIVE SIGNAL',
    location: 'RADIO STATION 107.9',
    description: `CASE SUMMARY:

In 1987, a radio operator received an unusual transmission on a frequency that had been disconnected for several years.

The recording contained eleven separate voices singing what appeared to be the same melody.

On every subsequent playback, another voice could be heard.

BEHAVIOR:
The signal appears between 02:13 and 02:17 AM. It occasionally interrupts unrelated radio transmissions.

ORIGIN:
Unknown transmission source. No corresponding broadcasting station has been located.

LAST RECORDED SIGHTING:
An abandoned radio station outside Blackwood.

FINAL NOTE:
The newest voice on the recording appears to say the full name of whoever is listening.`
  },

  'The Red Room': {
    number: '003',
    date: 'MAR 22, 1991',
    status: 'UNRESOLVED',
    location: 'MULTIPLE LOCATIONS',
    description: `CASE SUMMARY:

A strange red door has been reported in several unrelated buildings.

Every witness describes the same details: an old wooden door, a brass handle and a faint sound coming from the other side.

Architectural inspections reveal that no room exists behind the reported locations.

BEHAVIOR:
The door appears without warning. It has never been successfully opened in a documented investigation.

ORIGIN:
Unknown. Reports have appeared in three different towns.

LAST RECORDED SIGHTING:
An abandoned hotel, March 1991.

FINAL NOTE:
A maintenance worker reported hearing someone gently knocking from the other side. The building had been empty for 19 years.`
  },

  'The Watcher': {
    number: '004',
    date: 'JUN 18, 2004',
    status: 'UNDER OBSERVATION',
    location: 'BLACKWOOD OUTSKIRTS',
    description: `CASE SUMMARY:

The Watcher is a tall, motionless figure repeatedly reported near residential properties surrounding Blackwood.

It is always facing a building.

Witnesses describe a dark silhouette with an unusually long outline. No facial features have ever been identified.

BEHAVIOR:
The figure is most frequently reported after electrical outages. It appears to change position between observations.

ORIGIN:
Unknown. No reliable physical evidence has been recovered.

LAST RECORDED SIGHTING:
June 18, 2004. Blackwood residential district.

FINAL NOTE:
An investigator discovered a photograph of the figure standing behind him. The photograph was dated two days before the investigation began.`
  },

  'The Mourn­er': {
    number: '005',
    date: 'FEB 09, 1978',
    status: 'UNCONFIRMED',
    location: 'OLD RAILWAY STATION',
    description: `CASE SUMMARY:

The Mourn­er is a mysterious figure associated with an abandoned railway station.

Witnesses report hearing a quiet humming sound shortly before seeing a person dressed in dark clothing standing on the opposite platform.

The figure never boards a train.

BEHAVIOR:
It appears during heavy rain and disappears when approached.

ORIGIN:
No identity has been established.

LAST RECORDED SIGHTING:
February 9, 1978.

FINAL NOTE:
A railway employee reported that the station clock stopped at exactly 03:33 every time the figure appeared.`
  },

  'The Red Visitor': {
    number: '006',
    date: 'SEP 13, 1996',
    status: 'RESTRICTED',
    location: 'HOUSE 17, BLACKWOOD',
    description: `CASE SUMMARY:

House 17 was abandoned in September 1996 after several reports of an unknown presence inside the building.

Neighbors described a faint red light visible through the upstairs windows.

No electricity was connected to the property.

BEHAVIOR:
The light appears in different rooms. Reports suggest that it sometimes moves when observed.

ORIGIN:
Unknown. The original owner disappeared from public records.

LAST RECORDED SIGHTING:
September 13, 1996.

FINAL NOTE:
A photograph recovered from the property shows an unfamiliar silhouette standing in a room that was confirmed to be empty.`
  }
};

// ==========================================
// FILTER SYSTEM
// ==========================================

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const active = document.querySelector('.filter.active');

    if (active) active.classList.remove('active');

    button.classList.add('active');

    const filter = button.dataset.filter;

    document.querySelectorAll('.entity-card').forEach(card => {
      card.classList.toggle(
          'hidden',
          filter !== 'all' && card.dataset.type !== filter
      );
    });
  });
});

// ==========================================
// CASE FILE MODAL
// ==========================================

const modal = document.getElementById('caseModal');

const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalDescription = document.getElementById('modalDescription');

const modalDate = document.getElementById('modalDate');

const modalClose = document.getElementById('modalClose');

function openCase(card) {
  const name = card.dataset.name;
  const entity = entities[name];

  if (!entity || !modal) return;

  modalTitle.textContent = name.toUpperCase();
  modalKicker.textContent = 'CASE FILE / ' + entity.number;
  modalDescription.textContent = entity.description;

  if (modalDate) {
    modalDate.textContent = entity.date;
  }

  // Update the existing modal information
  const data = modal.querySelectorAll('.modal-data > div');

  if (data[1]) {
    data[1].querySelector('b').textContent = entity.status;
  }

  if (data[2]) {
    data[2].querySelector('b').textContent = entity.location;
  }

  modal.classList.add('show');
  document.body.classList.add('modal-open');
}

document.querySelectorAll('.open-file').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.entity-card');

    if (card) openCase(card);
  });
});

// Allow clicking the entire entity card
document.querySelectorAll('.entity-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('.open-file')) return;
    if (e.target.closest('button')) return;

    openCase(card);
  });
});

function closeCase() {
  if (modal) modal.classList.remove('show');
  document.body.classList.remove('modal-open');
}

if (modalClose) {
  modalClose.addEventListener('click', closeCase);
}

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeCase();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCase();
});

// ==========================================
// SIGNAL TRANSMISSION
// ==========================================

const signalButton = document.getElementById('signalButton');

if (signalButton) {
  signalButton.addEventListener('click', () => {
    const message = document.getElementById('signalMessage');

    if (!message) return;

    message.classList.add('show');
    message.textContent = 'SIGNAL CONNECTED // UNKNOWN VOICE DETECTED';

    setTimeout(() => {
      message.textContent = 'SIGNAL LOST. SOMETHING ANSWERED.';
    }, 2600);
  });
}
