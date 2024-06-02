import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast();

const Toast = {
    getDefaultOptions: function() {
        return {
            duration: 1500,
            isClosable: true,
            position: "top",
        };
    },
    show: function(isSuccess, successMessage, failMessage) { 
        toast({
			title: isSuccess ? successMessage : failMessage,
            status: isSuccess ? "success" : "error",
            ...this.getDefaultOptions(),
        });
    },
    showSuccess: function(message) { 
        toast({
			title: message, 
            status: "success",
            ...this.getDefaultOptions(),
        });
    },
    showFailed: function(message) { 
        toast({
			title: message,
            status: "error",
            ...this.getDefaultOptions(),
        });
    },
    showInfo: function(message) { 
        toast({
			title: message, 
            status: "info",
            ...this.getDefaultOptions(),
        });
    },
};

export default Toast;