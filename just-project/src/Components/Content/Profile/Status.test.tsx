import React from 'react'
import { create } from "react-test-renderer"
import Status from "./Status"

describe('Status tests',()=>{
    test('status',()=>{
        const setStatus = jest.fn()
        const myStatus = create(<Status status = "status" setUserStatus={setStatus} showEditButtons= {true} />)
        const root = myStatus.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('status')
    })
})