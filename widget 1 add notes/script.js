$(function() {
  function saveNotes() {
      var notes = [];
      $('#note-full-container .single-note-item').each(function() {
          notes.push({
              title: $(this).find('.note-title').text(),
              description: $(this).find('.note-inner-content').text(),
              date: $(this).find('.note-date').text(),
              classes: $(this).attr('class') // Save all classes to restore note state
          });
      });
      localStorage.setItem('notes', JSON.stringify(notes));
  }

  function loadNotes() {
      var notes = JSON.parse(localStorage.getItem('notes'));
      if (notes) {
          notes.forEach(note => {
              var $html = `<div class="col-md-4 single-note-item ${note.classes}">
                              <div class="card card-body">
                                  <span class="side-stick"></span>
                                  <h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="${note.title}">${note.title}<i class="point fa fa-circle ml-1 font-10"></i></h5>
                                  <p class="note-date font-12 text-muted">${note.date}</p>
                                  <div class="note-content">
                                      <p class="note-inner-content text-muted" data-noteContent="${note.description}">${note.description}</p>
                                  </div>
                                  <div class="d-flex align-items-center">
                                      <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
                                      <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
                                      <div class="ml-auto">
                                          <div class="category-selector btn-group">
                                              <a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                                                  <div class="category">
                                                      <div class="category-business"></div>
                                                      <div class="category-social"></div>
                                                      <div class="category-important"></div>
                                                      <span class="more-options text-dark"><i class="icon-options-vertical"></i></span>
                                                  </div>
                                              </a>
                                              <div class="dropdown-menu dropdown-menu-right category-menu">
                                                  <a class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Business</a>
                                                  <a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Social</a>
                                                  <a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Important</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>`;
              $("#note-full-container").append($html);
          });

          removeNote();
          favouriteNote();
          addLabelGroups();
      }
  }

  function removeNote() {
      $(".remove-note").off('click').on('click', function(event) {
          event.stopPropagation();
          $(this).parents('.single-note-item').remove();
          saveNotes(); // Save changes after removing a note
      });
  }

  function favouriteNote() {
      $(".favourite-note").off('click').on('click', function(event) {
          event.stopPropagation();
          $(this).parents('.single-note-item').toggleClass('note-favourite');
          saveNotes(); // Save changes after toggling favorite
      });
  }

  function addLabelGroups() {
      $('.category-selector .badge-group-item').off('click').on('click', function(event) {
          event.preventDefault();
          var getclass = this.className;
          var getSplitclass = getclass.split(' ')[0];
          var $parentNote = $(this).parents('.single-note-item');

          if ($(this).hasClass('badge-business')) {
              $parentNote.removeClass('note-social note-important').toggleClass(getSplitclass);
          } else if ($(this).hasClass('badge-social')) {
              $parentNote.removeClass('note-business note-important').toggleClass(getSplitclass);
          } else if ($(this).hasClass('badge-important')) {
              $parentNote.removeClass('note-social note-business').toggleClass(getSplitclass);
          }

          saveNotes(); // Save changes after adding or changing labels
      });
  }

  var $btns = $('.note-link').click(function() {
      var category = this.id;
      var $el = $('.' + category).fadeIn();
      $('#note-full-container > div').not($el).hide();
      $btns.removeClass('active');
      $(this).addClass('active');
  });

  $('#add-notes').on('click', function(event) {
      $('#addnotesmodal').modal('show');
      $('#btn-n-save').hide();
      $('#btn-n-add').show();
  });

  $("#btn-n-add").on('click', function(event) {
      event.preventDefault();
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth()); //January is 0!
      var yyyy = today.getFullYear();
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      today = dd + ' ' + monthNames[mm]  + ' ' + yyyy;

      var $_noteTitle = document.getElementById('note-has-title').value;
      var $_noteDescription = document.getElementById('note-has-description').value;

      var $html = `<div class="col-md-4 single-note-item all-category">
                      <div class="card card-body">
                          <span class="side-stick"></span>
                          <h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="${$_noteTitle}">${$_noteTitle}<i class="point fa fa-circle ml-1 font-10"></i></h5>
                          <p class="note-date font-12 text-muted">${today}</p>
                          <div class="note-content">
                              <p class="note-inner-content text-muted" data-noteContent="${$_noteDescription}">${$_noteDescription}</p>
                          </div>
                          <div class="d-flex align-items-center">
                              <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
                              <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
                              <div class="ml-auto">
                                  <div class="category-selector btn-group">
                                      <a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                                          <div class="category">
                                              <div class="category-business"></div>
                                              <div class="category-social"></div>
                                              <div class="category-important"></div>
                                              <span class="more-options text-dark"><i class="icon-options-vertical"></i></span>
                                          </div>
                                      </a>
                                      <div class="dropdown-menu dropdown-menu-right category-menu">
                                          <a class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Business</a>
                                          <a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Social</a>
                                          <a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Important</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>`;

      $("#note-full-container").prepend($html);
      $('#addnotesmodal').modal('hide');

      removeNote();
      favouriteNote();
      addLabelGroups();

      saveNotes(); // Save notes after adding a new one
  });

  $('#addnotesmodal').on('hidden.bs.modal', function (event) {
      event.preventDefault();
      document.getElementById('note-has-title').value = '';
      document.getElementById('note-has-description').value = '';
  });

  removeNote();
  favouriteNote();
  addLabelGroups();
  loadNotes(); // Load notes on page load

  $('#btn-n-add').attr('disabled', 'disabled'); 

  $('#note-has-title').keyup(function() {
      var empty = $(this).val() === '';
      $('#btn-n-add').attr('disabled', empty ? 'disabled' : false);
  });
});
