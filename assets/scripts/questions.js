// list of all questions, choices, and answers
// Used https://www.w3schools.com/quiztest/quiztest.asp to create questions used in this quiz
var questions = [
  {
    title: 'Inside which HTML element do we put the JavaScript:',
    choices: ['<head>','<script>', '<javascript>',  '<footer>'],
    answer: '<script>',
  },
  {
    title: 'What is the correct way to reference an external script called "test.js"? ',
    choices: ['<script href="test.js">', '<script src="test.js">', '<script name="test.js">', '<script name="test.js">'],
    answer: '<script src="test.js">',
  },
  {
    title: 'What is the correct way to create an array in JavaScript?',
    choices: [
      'var values = 1,3,4,2',
      'var values = [1,3,4,2]',
      'var values = {one: 1, two: 3, three: 4,four: 2}',
      'var values = "1","3","4","2"',
    ],
    answer: 'var values = [1,3,4,2]',
  },
  {
    title:
      'How can you detect the client browser name?.',
    choices: ['browser.name', 'cleint.name', 'window.name', 'this.name'],
    answer: 'browser.name',
  },
  {
    title:
      'Which event occurs when the user clicks on an HTML element?',
    choices: ['onmouseclick', 'onmouseover', 'change', 'onclick'],
    answer: 'onclick',
  },
];
