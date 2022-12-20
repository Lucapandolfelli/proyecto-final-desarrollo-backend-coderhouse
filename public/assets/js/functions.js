export const renderMessages = (messages) => {
  if (messages) {
    const html = messages
      .map((message) => {
        return `<div class="border rounded p-4 w-100 d-flex justify-content-center flex-column gap-4">
                  <div class="d-flex justify-content-center gap-3">
                    <div class="rounded-circle overflow-hidden" style="width: 50px; height: 50px;">
                      <img src="/uploads/${
                        message.image
                      }" style="width: 100%; height: 100%; object-fit: cover;"> 
                    </div>
                    <div class="w-100">
                      <h4 class="fw-semibold" style="font-size: 1rem;">${
                        message.email
                      }:</h4>
                      <p class="fw-lighter m-0 pb-1">${message.message}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <span style="font-size: .875rem; color: rgba(0,0,0,0.4);">${
                          message.hour
                        }</span>
                        <div class="d-flex gap-2">
                          <a class="text-decoration-none" data-bs-toggle="collapse" href="#collapse${
                            message._id
                          }" role="button" aria-expanded="false" aria-controls="collapse${
          message._id
        }"><i class="fa-solid fa-comment message-options__button"></i><span class="comments_counter">${
          message.replies.length
        }</span></a>
                          <a href="#"><i class="fa-sharp fa-solid fa-share message-options__button"></i></a>
                          <a href="#"><i class="fa-solid fa-trash message-options__button"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr style="background-color: #dee2e6 !important; opacity: 1 !important;">
                  <div class="collapse multi-collapse" id="collapse${
                    message._id
                  }">
                    <div class="d-flex flex-column gap-3">

                      ${
                        message.replies.length > 0
                          ? message.replies
                              .map((reply) => {
                                return `
                          <div class="border rounded p-4 w-100 d-flex flex-column justify-content-center gap-3">
                            <div class="rounded-circle overflow-hidden" style="width: 50px; height: 50px;">
                              <img src="/uploads/${reply.image}" style="width: 100%; height: 100%; object-fit: cover;"> 
                            </div>
                            <div>
                              <h4 class="fw-semibold" style="font-size: 1rem;">${reply.email}</h4>
                              <p class="fw-lighter m-0 pb-1">${reply.message}</p>
                              <span style="font-size: .875rem; color: rgba(0,0,0,0.4);">${reply.hour}</span>
                            </div>
                          </div>
                          `;
                              })
                              .join(" ")
                          : `<div class="border rounded p-4">
                              <p class="m-0 fw-lighter">Nadie respondió a esta consulta todavía. Sé el primero.</p>
                            </div>`
                      }
                      
                    </div>
                  </div>
                  <div>
                    <form action="/consultas/${
                      message._id
                    }/reply" method="POST" class="d-flex justify-content-between align-items-center gap-3">
                      <input type="hidden" id="message-id" name="id" value="${
                        message._id
                      }" />
                      <input type="hidden" id="user-id" name="userId" value="${
                        message.userId
                      }" />
                      <input class="border-0 bg-light p-2 px-3 w-100" type="text" required name="message" style="border-radius: 1rem;" id="message-input" placeholder="Deja un comentario."/>
                      <button class="chat_button bg-danger">Responder</button>
                    </form>
                  </div>
                </div>`;
      })
      .join(" ");
    document.getElementById("messageList").innerHTML = html;
  } else {
    const html = `
      <p>Todavía nadie realizó una consulta. Sé el primero en hacerlo</p>
    `;
    document.getElementById("messageList").innerHTML = html;
  }
};
