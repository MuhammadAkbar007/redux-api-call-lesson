import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation'

function PostModal({isOpen, toggle, submit, currentItem}) {
    return <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Add Post</ModalHeader>
        <ModalBody>
            <AvForm onSubmit={submit} id={'postForm'} model={currentItem ? currentItem : {}}>
                <AvField type={'text'} name={'title'} label={'Title'}/>
                <AvField type={'textarea'} name={'body'} label={'Body'}/>
            </AvForm>
        </ModalBody>
        <ModalFooter>
            <button className={'btn btn-success'} type={'submit'} form={'postForm'}>Save</button>
            <button className={'btn btn-danger'} onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
}

export default PostModal