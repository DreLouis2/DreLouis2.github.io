import React from 'react'
import { LandingHeader } from 'components'
import { Container, Row, Col } from 'react-bootstrap'

const LandingPage = (props) => {

  const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})


    


  return (
    <div style={{overflow: "auto", height: "100vh"}}>
      <LandingHeader login />
      <div className='d-flex justify-content-center flex-row' style={{width: 'auto', padding: '10px, 0'}}>
        <span style={{width: '45%', height: '60%', textAlign: 'center'}} className='d-flex justify-content-center flex-column'>
          <h3 style={{fontWeight: 'bold'}} >Calm Tip Of The Day</h3>
          <h4 style={{}}>{date}</h4>
          <br/>
          <h6 style={{fontWeight: 'bold'}}> Breathe </h6>
            <span style={{width: '80%', margin: 'auto', textAlign: 'left'}}>
            <p>When you’re overwhelmed with anxiety, the 5-4-3-2-1 coping technique could help calm your thoughts down.</p>

            <p>Here’s how it works:</p>

            <ul style={{listStyleType: 'none'}}>
            <li> <b>Five.</b> Look around the room, then name five things you see around you. These can be objects, spots on the wall, or a bird flying outside. The key is to count down those five things.</li>
            <br/>
            <li> <b>Four.</b> Next, name fourthings you can touch. This can be the ground beneath your feet, the chair you’re sitting in, or your hair that you run your fingers through.</li>
            <br/>
            <li> <b>Three.</b> Listen quietly, then acknowledge three things you can hear. These can be external sounds, like a fan in the room, or internal sounds, like the sound of your breathing.</li>
            <br/>
            <li> <b>Two.</b> Note two things you can smell. Maybe that’s the perfume you’re wearing or the pencil you’re holding.</li>
            <br/>
            <li> <b>One.</b> Notice something you can taste inside your mouth. Maybe that’s the lipgloss you’re wearing.</li>
            </ul>

            <p>This technique works best if you pair it with deep, slow breathing.</p>
              </span>
            </span>

        <div style={{
          width: '50%',
          background: "url('https://neuro.wharton.upenn.edu/wp-content/uploads/2020/04/iStock-Blog2-e1585773724832.jpg') rgba(0, 0, 0, 0.2",
          backgroundSize: 'cover',
          backgroundPosition: '50% 20%',
          backgroundBlendMode: 'multiply',
          height: 'auto',
          padding: '4rem 2rem',
        }}/>
      </div>
    </div>
  )
}

export default LandingPage;
