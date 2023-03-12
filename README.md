# LMS

Overview
The LMS (Learning Management System) website is a platform designed to facilitate online learning and teaching. It integrates various features such as an IDE, CTF, gamification, and Zoom classes to provide an all-in-one solution for both educators and learners.


Features
Integrated Development Environment (IDE)
The integrated development environment (IDE) allows learners to practice coding exercises within the LMS website. It provides a web-based interface for writing, executing, and testing code. The IDE supports various programming languages and provides features such as syntax highlighting, auto-completion, and debugging.

Capture the Flag (CTF)
The Capture the Flag (CTF) feature allows learners to participate in hacking challenges within the LMS website. It provides a safe and controlled environment for learners to test their hacking skills and learn about cybersecurity. The CTF challenges are designed to simulate real-world scenarios and cover topics such as web security, network security, and cryptography.

Gamification
The gamification feature is designed to motivate learners to engage with the learning content and complete their coursework. It provides a system of rewards, badges, and achievements to recognize learners' progress and achievements. The gamification feature encourages learners to set goals, track their progress, and compete with other learners.

Zoom Classes
The Zoom classes feature provides a virtual classroom environment for learners and educators to conduct live lectures and discussions. It allows learners to interact with their peers and instructors in real-time and provides a platform for sharing presentations, whiteboards, and other learning materials. The Zoom classes feature supports breakout rooms, screen sharing, and recording of sessions for later review.

Getting Started
To get started with the LMS website, learners and educators need to create an account and log in. Once logged in, they can access the various features of the platform, such as the IDE, CTF, gamification, and Zoom classes. Learners can browse and enroll in courses offered by educators, while educators can create and manage courses, assignments, and assessments.


LIST OF APIS:
http://127.0.0.1:9999/badge/addBadges{
    type:POST,
    Payload:{email:email}
}
http://127.0.0.1:9999/badge/addmp{
    type:POST
    payload:{userEmail: userEmail,
            courseId: courseId,
            moduleId: moduleId}
}
http://127.0.0.1:9999/badge/addcp{
    type:POST
     payload:{userEmail: userEmail,
            courseId: courseId,
            challengeId: challengeId}
}
http://127.0.0.1:9999/badge/addqp{
    type:POST
     payload:{userEmail: userEmail,
            courseId: courseId,
            quizId: quizId}
}
http://127.0.0.1:9999/badge/getBadges/+email{
    type:POST
}

http://127.0.0.1:9999/userProfile/+email{
    type:POST
}
http://127.0.0.1:9999/userProfile/+email{
    type:GET
}


http://127.0.0.1:9999/a/login{
    type:POST
    payload:{
        email
        password
    }
}
http://127.0.0.1:9999/a/instrutorUpdate{
    type:POST
    payload:[
        Message:req.body.Message,
        File:req.file.location,
        Linked:req.body.Linked
    ]

}
http://127.0.0.1:9999/a/acceptOrReject{
    type:POST
    
}
http://127.0.0.1:9999/a/status{
    type:POST
    payload:{
        email:email
    }
}
http://127.0.0.1:9999/courseDetails/gc1/+courseTitle{
    type:GET
}

http://127.0.0.1:9999/courseDetails/gc{
    type:GET
}
http://127.0.0.1:9999/courseDetails/problems{
    type:POST
}
http://127.0.0.1:9999/courseDetails/Curriculum{
    type:POST
}
http://127.0.0.1:9999/courseDetails/getProblem/+questionid{
    type:GET
}
http://127.0.0.1:9999/courseDetails/content{
    type:POST
}
http://127.0.0.1:9999/courseDetails/savecourse{
    type:POST
}
http://127.0.0.1:9999/Addchallenge/get{
    type:GET
}
http://127.0.0.1:9999/Addchallenge/:title{
    type:get

}
http://127.0.0.1:9999/Addchallenge/create{
    type:POST
    payload:{
        category: req.body.courseId , 
    title: req.body.title,
     description: req.body.description,
      flag: req.body.flag, 
      points: req.body.points, 
      hint: req.body.hint
      }
}
http://127.0.0.1:9999/Addchallenge/solvedBy{
    type:POST
    payload:{title = req.body.title;
 flag = req.body.flag;
userEmail = req.body.userEmail;
}
}
http://127.0.0.1:9999/enroll/e{
    type:POST
    payload={
         email = req.body.Email;
courseName = req.body.Course_Name;
    }
}
http://127.0.0.1:9999/live{
    type:POST
    payload:{
         title:req.body.title,
      date:req.body.date,
      time:req.body.time,
      duration:req.body.duration,
      link:req.body.link
    }
}
http://127.0.0.1:9999/getLive{
 type:GET
}

