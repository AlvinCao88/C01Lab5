test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });



const SERVER_URL = "http://localhost:4000";
// test("/postNote - Post a note", async () => {
//   const title = "NoteTitleTest";
//   const content = "NoteTitleContent";

//   const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: title,
//       content: content,
//     }),
//   });

//   const postNoteBody = await postNoteRes.json();

//   expect(postNoteRes.status).toBe(200);
//   expect(postNoteBody.response).toBe("Note added successfully.");
// });

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.notes.length).toBe(0);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note to Delete",
      content: "Content to Delete",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const noteIdToDelete = addedNote.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteIdToDelete}`, {
    method: "DELETE",
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteIdToDelete} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note to update",
      content: "Content to update",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const noteIdToPatch = addedNote.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Updated Note",
      content: "Content have been updated",
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.` );

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const allNotes = await getAllNotesRes.json();
  
  expect(getAllNotesRes.status).toBe(200);

  const updatedNote = allNotes.notes.find(notes => notes._id === noteIdToPatch);
  expect(updatedNote.title).toBe("Updated Note");
  expect(updatedNote.content).toBe( "Content have been updated");


});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note to update",
      content: "Content the same",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const noteIdToPatch = addedNote.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Updated Title"
      
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.` );

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const allNotes = await getAllNotesRes.json();
  
  expect(getAllNotesRes.status).toBe(200);

  const updatedNote = allNotes.notes.find(notes => notes._id === noteIdToPatch);
  expect(updatedNote.title).toBe("Updated Title");
  expect(updatedNote.content).toBe("Content the same");
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Title the same",
      content: "Content to update",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const noteIdToPatch = addedNote.insertedId;

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "Updated Content"
      
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.` );

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const allNotes = await getAllNotesRes.json();
  
  expect(getAllNotesRes.status).toBe(200);

  const updatedNote = allNotes.notes.find(notes => notes._id === noteIdToPatch);
  expect(updatedNote.title).toBe("Title the same");
  expect(updatedNote.content).toBe("Updated Content");
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note to Delete",
      content: "Content to Delete",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
  const deleteAllNotesBody = await deleteAllNotesRes.json();
    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("4 note(s) deleted.");// since there is going to have 3 notes before this test
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  for (let i = 0; i < 3; i++) {
    const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `NoteToDelete_${i + 1}`,
        content: `ContentToDelete_${i + 1}`,
      }),
    });

    const addedNote = await addNoteRes.json();
    expect(addNoteRes.status).toBe(200);
    expect(addedNote.response).toBe("Note added successfully.");
    }

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();
    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const addNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Note to add color",
      content: "Content to add color",
    }),
  });

  const addedNote = await addNoteRes.json();

  expect(addNoteRes.status).toBe(200);
  expect(addedNote.response).toBe("Note added successfully.");

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${addedNote.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#FF0000" 
    }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();
  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
});