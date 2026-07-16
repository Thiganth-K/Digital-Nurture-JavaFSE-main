// TrainersMock.js - Mock data for trainers
import Trainer from './trainer';

const trainers = [
  new Trainer('T001', 'Alice Thomas',  'alice@cognizant.com',  '9876543210', 'React',          ['JavaScript', 'React', 'Redux', 'HTML5', 'CSS3']),
  new Trainer('T002', 'Bob Kumar',     'bob@cognizant.com',    '9876543211', 'Java',            ['Java', 'Spring Boot', 'Hibernate', 'REST API']),
  new Trainer('T003', 'Carol Singh',   'carol@cognizant.com',  '9876543212', 'Angular',         ['TypeScript', 'Angular', 'RxJS', 'Node.js']),
  new Trainer('T004', 'David Rao',     'david@cognizant.com',  '9876543213', 'Python',          ['Python', 'Django', 'Flask', 'Machine Learning']),
  new Trainer('T005', 'Eva Nair',      'eva@cognizant.com',    '9876543214', 'Microservices',   ['Docker', 'Kubernetes', 'Spring Cloud', 'AWS']),
  new Trainer('T006', 'Frank Mehta',   'frank@cognizant.com',  '9876543215', 'DevOps',          ['Jenkins', 'Git', 'CI/CD', 'Ansible', 'Terraform']),
];

export default trainers;
