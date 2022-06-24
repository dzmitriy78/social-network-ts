import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        console.log(error)
        return {hasError: true};
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        console.log(error, errorInfo);
    }

    render() {
        // @ts-ignore
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return <h1>Упс... Что-то пошло не так. <br/>Попробуйте перегрузить страницу.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary